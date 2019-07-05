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
  getUniboardDataUpdates(func) {
    chrome.storage.onChanged.addListener(function() {
      console.log('update received!')
      this._getUniboardData().then(x => {
        func(x);
      });
    });
    this._getUniboardData().then(x => func(x));
  }
  setUpUniboard(){
    
  }
  fetchUniboardData(){

  }
  setUniboardData(){

  }
}
const database = new Database();
//  Object.freeze(database);
export default database;
