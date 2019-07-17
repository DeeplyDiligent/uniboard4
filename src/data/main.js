import store from "store";
import observe from "store/plugins/observe";
/*global chrome*/

class Database {
  constructor() {
    store.addPlugin(observe);
  }
  _getSubjectData() {
    console.log("getting moodle data from chrome storage");
    return store.get("SubjectData");
  }
  _getSubjectList() {
    console.log("getting moodle data from chrome storage");
    return store.get("SubjectList");
  }
  _getCloudSync() {
    console.log("getting moodle data from chrome storage");
    return store.get("CloudSync");
  }
  async _getUniboardSesskey() {
    return new Promise(function(resolve) {
      chrome.storage.local.get(null, function(result) {
        resolve(result["sessKeyForUniboard"]);
      });
    });
  }
  getUniboardDataUpdates(func) {
    store.observe("uniBoardSubjectData", function(val, oldVal) {
      console.log("update received!", val);
      // console.log("update received!", store. get("uniBoardSubjectData"));
      func(val);
    });
  }

  async fetchSubjects() {
    let key = await this._getUniboardSesskey();
    let url =
      "https://lms.monash.edu/lib/ajax/service.php?sesskey=" +
      key +
      "&info=theme_monash_get_enrolled_courses_by_timeline_classification";
    let response = await fetch(url, {
      method: "post",
      body:
        '[{"index":0,"methodname":"theme_monash_get_enrolled_courses_by_timeline_classification","args":{"classification":"timeline","limit":999,"offset":0,"sort":"en.timecreated desc","search":null}}]'
    });
    let json = await response.json();
    let subjects = json[0]["data"]["courses"];
    return subjects;
  }

  commitSubjectNamesAndCloudSync(selectedSubjects, cloudSync) {
    store.set("uniBoardSubjectData", {});
    // console.log('selectedSubjectsand CloudSync',selectedSubjects, cloudSync)
    store.set("uniBoardSubjectData", {
      ...this._getUniboardData(),
      selectedSubjects: selectedSubjects,
      cloudSync: cloudSync
    });
  }
  _getSubjectsSelected() {
    // console.log(store.get("subjectsSelected"));
    return store.get("subjectsSelected");
  }

  async refreshSelectedSubjectData() {
    let selectedSubjects = this._getSubjectsSelected();
    console.log(selectedSubjects);
    selectedSubjects.map(subject => {
      let id = subject.id;
      this.fetchSubjectData(id);
    });
  }

  async fetchSubjectData(subjectsid, type = 20) {
    let branchData = await fetch(
      "https://lms.monash.edu/lib/ajax/getnavbranch.php",
      {
        data: "id=" + subjectsid + "&type=" + type,
        method: "POST"
      }
    );
    let data = await branchData.json();
    let uniboardData = this._getUniboardData();
    uniboardData[subjectsid][data.key] = data;
    if (data.children && data.children[0]) {
      data.children.map((x, i) => {
        console.log("get started for ", x.expandable, x.type);
        if (x.expandable) {
          this.fetchSubjectData(x.expandable, x.type);
        }
        return false;
      });
    }
    console.log(uniboardData);
  }
}
const database = new Database();
//  Object.freeze(database);
export default database;
