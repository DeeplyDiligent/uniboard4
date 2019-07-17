import firebase from "firebase";
import he from "he";
/*global chrome*/

class Database {
  async _getUniboardData() {
    console.log("getting moodle data from chrome storage");
    return new Promise(function(resolve) {
      chrome.storage.local.get(null, function(result){
        resolve(result["uniboardData"]);
      });
    });
  }
  async _getUniboardSesskey(){
    return new Promise(function(resolve) {
      chrome.storage.local.get(null, function(result){
        resolve(result["sessKeyForUniboard"]);
      });
    });
  }
  getUniboardDataUpdates(func) {
    let self = this
    chrome.storage.onChanged.addListener(function() {
      console.log('update received!')
      self._getUniboardData().then(x => {
        func(x);
      });
    });
    this._getUniboardData().then(x => func(x));
  }

  async fetchSubjects(){
    let key = await this._getUniboardSesskey();
    let url = 'https://lms.monash.edu/lib/ajax/service.php?sesskey=' + key +
        '&info=theme_monash_get_enrolled_courses_by_timeline_classification';
    let response = await fetch(url,{
      method: 'post',
      body: "[{\"index\":0,\"methodname\":\"theme_monash_get_enrolled_courses_by_timeline_classification\",\"args\":{\"classification\":\"timeline\",\"limit\":999,\"offset\":0,\"sort\":\"en.timecreated desc\",\"search\":null}}]"
    })
    let json = await response.json();
    let subjects = json[0]["data"]["courses"]
    return subjects;
  }

  commitSubjectNamesAndCloudSync(selectedSubjects, cloudSync){
    chrome.storage.local.set({
      uniboardData: {
        selectedSubjects: selectedSubjects,
        cloudSync: cloudSync
      }
    });
  }

  async refreshSelectedSubjectData(){
    let key = await this._getUniboardSesskey();
    let uniboardData = await this._getUniboardData();
    let selectedSubjects = uniboardData["selectedSubjects"];
    selectedSubjects.map((subject)=>{
      let id = subject.id;
    })
  }

  fetchSubjectData(subjectsids){

  }
  fetchUniboardData(){

  }
  setUniboardData(){

  }
}
const database = new Database();
//  Object.freeze(database);
export default database;
