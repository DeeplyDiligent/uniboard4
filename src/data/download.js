import $ from "jquery";
import database from "./main";
import swal from "sweetalert";

/*global chrome*/

class Download {
  async userIsLoggedIn() {
    let a = await $.ajax({ url: "https://lms.monash.edu/" });
    let notLoggedIn = a.includes(
      "Since your browser does not support JavaScript"
    );
    if (notLoggedIn) {
      return false;
    }
    return true;
  }

  // downloadUnit(data,unitName){
  // 	let folderName = 'uncategorized';
  // 	unitName = unitName?unitName:'uncategorized';
  // 	function listener(downloadItem, suggest){
  // 		let fullFileName = unitName+'/'+folderName+'/'+downloadItem.filename;
  // 		console.log(fullFileName)
  // 		suggest({filename:fullFileName, conflictAction:'overwrite'});
  // 		return true;
  // 	}

  // 	var x = 0;
  // 	var loopArray = function(arr, downloadSequentially) {
  // 		download(arr[x], downloadSequentially, function(){
  // 			x++;
  // 			if(x < arr.length) {
  // 				loopArray(arr, downloadSequentially);
  // 			}
  // 		});
  // 	}

  // 	function download(value,downloadSequentially,next) {
  // 		if (value.folders.length){
  // 			value.folders.map(function(val, index) {
  // 				chrome.tabs.create({url: val.url, active: false });
  // 			});
  // 		}
  // 		if (value.files.length){
  // 			unitName = unitName.replace(/[^a-zA-Z0-9]/g, '_');
  // 			folderName = value.name.replace(/[^a-zA-Z0-9]/g, '_');
  // 			console.log(unitName+'/'+folderName+'/');
  // 			let files = value.files.map((fileObj)=>fileObj.url);
  // 			console.log(files)
  // 			chrome.downloads.onDeterminingFilename.addListener(listener);
  // 			downloadSequentially(files,function(){
  // 				chrome.downloads.onDeterminingFilename.removeListener(listener);
  // 				next();
  // 			});
  // 		} else {
  // 			next();
  // 		}
  // 	}
  // 	loopArray(Object.values(data),this.downloadSequentially)
  // }

  startDownload(data, unitId) {
    let unitName = database.getSubjectName(unitId);
    swal({
      title: "Are you sure?",
      text: `Are you sure you wish to download all files for ${unitName}`,
      icon: "info",
      buttons: true
    }).then(willDelete => {
      if (willDelete) {
        swal(
          "Poof! Please keep the window open while the files are downloading!",
          {
            icon: "success"
          }
        );
        Object.values(data)
          .slice(1)
          .map(weekData => {
            if (weekData.children) {
              weekData.children.map(file => {
                if (file && file.title === "File") {
                  fetch(file.link + "&redirect=1").then(function(response) {
                    let weekName = weekData.name.replace(/[^a-zA-Z0-9]/g, '_')
                    let cloudfrontFileName = response.url.match("(?<=filename%3D%22)(.*)(?=%22)")
                    if(cloudfrontFileName) cloudfrontFileName = cloudfrontFileName[0]
                    let filename = cloudfrontFileName || response.url.split("/").pop();
                    let unitNameDownload = unitName.replace(/[^a-zA-Z0-9]/g, '_')
                    console.log(`${unitName}/${weekData.name}/${filename}`)
                    chrome.downloads.download({
                      url: response.url,
                      filename: `${unitNameDownload}/${weekName}/${filename}` ,
                      conflictAction:"overwrite"
                    });
                  })
                }
              });
            }
          });
      }
    });

    // console.log(data);
    // let warning = window.confirm("It is advised that you turn off 'Ask where to save each file before downloading' before proceeding.\n\n"+
    // 	"This may result in multiple tabs opening. All pdfs, documents and xlsx files will be immediately "+
    // 	"downloaded, but folders will open in a new tab. You will need to click 'download folder'"+
    // 	" in each tab that opens. \n\nAre you sure you would like to continue?");

    // this.userIsLoggedIn().then(loggedIn => {
    // 	if (!loggedIn){
    // 		alert('You arent logged in to moodle, please go to moodle and log into your account!');
    // 	} else if (warning) {
    // 		this.downloadUnit(data,unitName)
    // 	}
    // });
  }
  downloadSequentially(urls, callback) {
    urls.map(url =>
      chrome.downloads.download({
        url: url + "&redirect=1"
      })
    );
    let index = 0;
    let currentId;

    chrome.downloads.onChanged.addListener(onChanged);
    next();

    function next() {
      if (index >= urls.length) {
        chrome.downloads.onChanged.removeListener(onChanged);
        callback();
        return;
      }
      const url = urls[index] + "&redirect=1";
      index++;
      console.log(url);
      if (url) {
        chrome.downloads.download(
          {
            url
          },
          id => {
            currentId = id;
          }
        );
      }
    }

    function onChanged({ id, state }) {
      if (id === currentId && state && state.current !== "in_progress") {
        next();
      }
    }
  }
}

const download = new Download();
export default download;
