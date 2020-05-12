import store from "store";
import observe from "store/plugins/observe";
import he from "he";
import $ from "jquery";
import firebase from "firebase";
import moment from "moment";
/*global chrome*/

class Database {
  constructor() {
    store.addPlugin(observe);
    firebase.initializeApp({
      apiKey: "AIzaSyDummAaSk7h1T1AuC2BsU8zhTAH3H4tVNg",
      authDomain: "synopsis-465b0.firebaseapp.com",
      databaseURL: "https://synopsis-465b0.firebaseio.com",
      projectId: "synopsis-465b0",
      storageBucket: "synopsis-465b0.appspot.com",
      messagingSenderId: "1062729892729",
      appId: "1:1062729892729:web:6b39c9d7174ef4fb"
    });
    this.db = firebase.firestore();
  }
  _getSubjectData() {
    console.log("getting moodle data from chrome storage");
    return store.get("SUBJECT_DATA");
  }
  _setSubjectData(data) {
    console.log("setting moodle data on chrome storage");
    return store.set("SUBJECT_DATA", data);
  }
  getSubjectList() {
    console.log("getting moodle data from chrome storage");
    return store.get("SUBJECT_LIST", []);
  }
  _getCloudSync() {
    console.log("getting moodle data from chrome storage");
    return store.get("CLOUD_SYNC");
  }
  getDefaultLayout() {
    console.log("getting moodle data from chrome storage");
    return store.get("DEFAULT_LAYOUT", "subjectLayout");
  }
  setDefaultLayout(layout) {
    console.log("getting moodle data from chrome storage");
    return store.set("DEFAULT_LAYOUT", layout);
  }
  getSubjectName(subjectId, subjectData = this._getSubjectData()) {
    let subjectName = store.get("SUBJECT_NAMES", {})[subjectId];
    if (!subjectName) {
      subjectName = this.shortenName(
        Object.values(subjectData[subjectId])[0].name
      );
    }
    return subjectName;
  }
  shortenName(nameOfSubject) {
    var matches = nameOfSubject.match(/\w{3}\d{4}/g);
    if (matches != null) {
      nameOfSubject = matches[0];
    }
    return nameOfSubject;
  }
  getIcon(iconJSON) {
    let src =
      "https://lms.monash.edu/theme/image.php/monash/core/icon/f/html-96";
    if (iconJSON && iconJSON.pix.includes("f/")) {
      src = `https://lms.monash.edu/theme/image.php/monash/core/icon/${iconJSON.pix
        .toLowerCase()
        .slice(0, -3)}
            -96`;
    } else if (iconJSON) {
      src = `https://lms.monash.edu/theme/image.php/monash/${iconJSON.component.toLowerCase()}/icon/icon`;
    }
    return src;
  }
  getWeekData(subjectId, weekId) {
    let subjectData = this._getSubjectData();
    if (
      subjectData &&
      subjectData[subjectId] &&
      subjectData[subjectId][weekId]
    ) {
      return subjectData[subjectId][weekId];
    }
    return null;
  }
  transformToFlatArray() {
    let subjectData = this._getSubjectData();
    let flatArray = [];
    Object.values(subjectData).map(subjectBranchData => {
      Object.values(subjectBranchData)
        .slice(1)
        .map(branchXData => {
          if (branchXData.children) {
            branchXData.children.map(file => {
              if (file) {
                file.subject = Object.keys(subjectBranchData)[0];
                file.searchString = `${file.subject} ${file.name} ${
                  file.subject
                }`;
                flatArray.push(file);
              }
            });
          }
        });
    });
    return flatArray;
  }
  async getCalendarEvents(
    toDate = moment()
      .add(6, "M")
      .unix()
      .toString()
  ) {
    let sesskey = await this._getUniboardSesskey();
    let fetchData = await fetch(
      `https://lms.monash.edu/lib/ajax/service.php?sesskey=${sesskey}&info=core_calendar_get_action_events_by_timesort`,
      {
        credentials: "include",
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-AU,en-US;q=0.9,en;q=0.8",
          "cache-control": "no-cache",
          "content-type": "application/json",
          pragma: "no-cache",
          "x-requested-with": "XMLHttpRequest"
        },
        referrer: "https://lms.monash.edu/my/",
        referrerPolicy: "no-referrer-when-downgrade",
        body: `[{"index":0,"methodname":"core_calendar_get_action_events_by_timesort",
          "args":{"limitnum":10, "timesortfrom":${moment()
            .startOf("week")
            .unix()
            .toString()}, "timesortto":${toDate}}}]`,
        method: "POST",
        mode: "cors"
      }
    );
    fetchData = await fetchData.json();
    if (fetchData[0].error) return "error";
    return fetchData[0].data.events;
  }
  setSubjectName(subjectId, subjectName) {
    let subjectNames = store.get("SUBJECT_NAMES", {});
    subjectNames[subjectId] = subjectName;
    return store.set("SUBJECT_NAMES", subjectNames);
  }
  shortenName(nameOfSubject) {
    var matches = nameOfSubject.match(/\w{3}\d{4}/g);
    if (matches != null) {
      nameOfSubject = matches[0];
    }
    return nameOfSubject;
  }
  async _getUniboardSesskey() {
    return new Promise(function(resolve) {
      chrome.storage.local.get(null, function(result) {
        resolve(result["sessKeyForUniboard"]);
      });
    });
  }
  getUniboardDataUpdates(func) {
    store.observe("SUBJECT_DATA", function(val, oldVal) {
      console.log("update received!", val);
      // console.log("update received!", store. get("uniBoardSubjectData"));
      func({
        subjectData: val,
        lastUpdate: store.get("LAST_UPDATE"),
        subjectList: store.get("SUBJECT_LIST")
      });
    });
    store.observe("SUBJECT_LIST", function(val, oldVal) {
      console.log("update received!", val);
      func({
        subjectData: store.get("SUBJECT_DATA"),
        lastUpdate: store.get("LAST_UPDATE"),
        subjectList: val
      });
    });
  }

  getLoadingNowUpdates(func) {
    store.observe("UPDATE_IN_PROGRESS", function(val, oldVal) {
      func(val);
    });
  }
  getLastUpdatedUpdate(func) {
    store.observe("LAST_UPDATE", function(val, oldVal) {
      func(val);
    });
  }
  getLastUpdateDate() {
    return store.get("LAST_UPDATE");
  }
  getLoadingNow() {
    return store.get("UPDATE_IN_PROGRESS", true);
  }

  async fetchSubjects() {
    let key = await this._getUniboardSesskey();
    let url = `https://lms.monash.edu/lib/ajax/service.php?sesskey=${key}&info=core_course_get_enrolled_courses_by_timeline_classification`;
    let response = await fetch(url, {
      method: "post",
      body:
        '[{"index":0,"methodname":"core_course_get_enrolled_courses_by_timeline_classification","args":{"classification":"all","limit":999,"offset":0}}]'
    });
    let json = await response.json();
    let subjects = json[0]["data"]["courses"];
    return subjects;
  }
  initializeSubjectStore(selectedSubjects) {
    let subjectStore = {};
    selectedSubjects.forEach(subject => {
      subjectStore[subject.id] = {};
    });
    return subjectStore;
  }
  commitSubjectNamesAndCloudSync(selectedSubjects, cloudSync) {
    let subjectStore = this.initializeSubjectStore(selectedSubjects);
    window.setTimeout(() => {
      store.set("SUBJECT_DATA", subjectStore);
      store.set("SUBJECT_LIST", selectedSubjects);
      store.set("CLOUD_SYNC", cloudSync);
      store.set("LAST_UPDATE", null);
      this.fetchSubjectDataController(selectedSubjects);
    }, 0);
  }
  _getSubjectsSelected() {
    // console.log(store.get("subjectsSelected"));
    return store.get("SUBJECT_LIST");
  }

  // async refreshSelectedSubjectData() {
  //   let selectedSubjects = this._getSubjectsSelected();
  //   console.log(selectedSubjects);
  //   selectedSubjects.map(subject => {
  //     let id = subject.id;
  //     this.fetchSubjectData(id);
  //   });
  // }

  fetchSubjectDataController = subjects => {
    store.set("UPDATE_IN_PROGRESS", true);
    this.toExpand = subjects.length;
    this.done = 0;
    subjects.map(subject => {
      this._fetchSubjectData(subject.id, subject.id);
    });
  };

  // _storeSubjectData(subjectId, branchId,){
  //   let oldSubjectData = store.get("SUBJECT_DATA",{});
  //   oldSubjectData.subjectId
  //   store.set("SUBJECT_DATA", )
  // }

  _fetchSubjectData = async (subjectid, branchId, type = 20) => {
    let branchData = await fetch(
      "https://lms.monash.edu/lib/ajax/getnavbranch.php?id=" +
        branchId +
        "&type=" +
        type,
      { method: "POST" }
    );
    this.done++;
    let data = JSON.parse(he.decode(await branchData.text()));
    let uniboardData = this._getSubjectData();
    if(!data.error){
      uniboardData[subjectid][data.key] = data;
    }
    this._setSubjectData(uniboardData);
    if (data.children && data.children[0]) {
      data.children.map((x, i) => {
        console.log("get started for ", x.expandable, x.type);
        if (x.expandable) {
          this.toExpand++;
          this._fetchSubjectData(subjectid, x.expandable, x.type);
        }
        return false;
      });
    }
    if (this.done === this.toExpand) {
      this.expansionDone();
    }
  };

  async getAllChatRooms(){
    let chatrooms = []
    let querySnapshot = await this.db.collection("messenger").get();
    querySnapshot.forEach((doc) => {
        chatrooms.push(doc.id);
    });
    console.log(chatrooms);
    return chatrooms
  }

  listenForChats(room,newMessage){
    console.log('listenforchats', room)
    let listener = this.db.collection("messenger").doc(room).collection('messages').orderBy('time','desc').limit(500).onSnapshot(function(querySnapshot) {
        var messages = querySnapshot.docs.map(message=>({id: message.id, ...message.data()})).filter(message=>message.time!==null).reverse()
        newMessage(messages)
    });
    return listener
  }

  sendMessage(room, message, userEmail){
    console.log('sendmessage',room,message, userEmail)
    this.db.collection("messenger").doc(room).set({},{merge:true})
    this.db.collection("messenger").doc(room).collection('messages').add({
      message: message,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      userEmail: userEmail
    });;
  }

  expansionDone = () => {
    store.set("LAST_UPDATE", new Date());
    store.set("UPDATE_IN_PROGRESS", false);
    this.commitToFirebase(this._getSubjectData());
  };
  commitToFirebase(data) {
    let temp1 = data;
    let temp2 = {};
    Object.values(temp1).map(subjectData => {
      let subjectName = Object.values(subjectData)[0].name;
      temp2[subjectName] = {};
      let expandableBranches = Object.values(subjectData)[0].children;
      expandableBranches.map(expandableBranch => {
        if (expandableBranch.id) {
          temp2[subjectName][expandableBranch.id] = {
            img: null,
            text: expandableBranch.name,
            children: []
          };
          if (
            subjectData[expandableBranch.key] &&
            subjectData[expandableBranch.key].children
          ) {
            temp2[subjectName][expandableBranch.id].children = subjectData[
              expandableBranch.key
            ].children
              .map(x => x.key)
              .filter(x => x);
          }
        }
      });
      let files = Object.values(subjectData)
        .slice(1)
        .map(x => x.children);
      [].concat
        .apply([], files)
        .filter(x => x)
        .map(file => {
          temp2[subjectName][file.key] = {
            children: [],
            img: this.getIcon(file.icon),
            link: file.link,
            text: file.name
          };
        });
    });
    $.ajax({
      url: "https://lms.monash.edu/user/profile.php",
      context: document.body
    }).done(function(profileData) {
      let emailAddress = $(profileData)
        .find(
          "#region-main > div > div > div > div > " +
            "section:nth-child(1) > ul > li:nth-child(2) > dl > dd > a"
        )
        .html();
      temp2.date = new Date();
      this.db.collection("dba")
        .doc(emailAddress)
        .set(temp2);
    });
  }

  getEmail = (loadEmailDone) => {
    $.ajax({
      url: "https://lms.monash.edu/user/profile.php",
      context: document.body
    }).done(function(profileData) {
      let emailAddress = $(profileData)
        .find(
          "#region-main > div > div > div > div > " +
            "section:nth-child(1) > ul > li:nth-child(2) > dl > dd > a"
        )
        .html();
      loadEmailDone(emailAddress)
    }).catch(err=>{
      loadEmailDone("", true)
    });
  }
  getLastMessageTime = async (channelId) => {
    let doc = await this.db.collection("messenger").doc(channelId).collection('messages').orderBy('time','desc').limit(1).get()
    if(doc && doc.docs && doc.docs[0] && doc.docs[0].data()["time"] && doc.docs[0].data()["time"].toDate()){
      return doc.docs[0].data()["time"].toDate()
    }
    return 0
  }
  setLastActiveTime = (channelId) =>{
    return store.set(`lastActiveTime.${channelId}`, new Date().toISOString())
  }
  getLastActiveTime = (channelId) =>{
    return store.get(`lastActiveTime.${channelId}`, new Date('1997-07-16T19:20:30+01:00').toISOString())
  }
  observeLastActiveTime = (channelId, f) => {
    store.observe(`lastActiveTime.${channelId}`, f)
  }
}
const database = new Database();
//  Object.freeze(database);
export default database;
