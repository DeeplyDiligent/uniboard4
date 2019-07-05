chrome.browserAction.onClicked.addListener(function(tab) {
  console.log("button clicked");
  chrome.tabs.create({
    url: "https://lms.monash.edu/"
  });
});

chrome.runtime.setUninstallURL(
  "https://docs.google.com/forms/d/1kOD5hBjqLuWnVon_3rc34N9kjfCgaRHFp-lQZGHGNFg"
);

firebase.initializeApp({
  apiKey: "AIzaSyDummAaSk7h1T1AuC2BsU8zhTAH3H4tVNg",
  authDomain: "synopsis-465b0.firebaseapp.com",
  projectId: "synopsis-465b0"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

//show justUpdated modal if app has been updated
chrome.runtime.onInstalled.addListener(function(details) {
  var thisVersion = chrome.runtime.getManifest().version;
  if(details.reason == "install"){
    localStorage.setItem('modalToOpen','welcome')
  } else if(details.reason == "update"){
    localStorage.setItem('modalToOpen','update')
    localStorage.setItem('version',thisVersion)
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log("change recived!");
  chrome.storage.local.get(null, function(result) {
    if (result["sendDataOnline"]) {
      moodleData = result["MoodleBeast"];
      userSettings = result["userData"];
      $.ajax({
        url: "https://lms.monash.edu/user/profile.php",
        context: document.body
      }).done(function(profileData) {
        emailAddress = $(profileData)
          .find(
            "#region-main > div > div > div > div > " +
              "section:nth-child(1) > ul > li:nth-child(2) > dl > dd > a"
          )
          .html();
        var dataToSendOnline = { date: new Date() };
        delete moodleData["sesskey"];
        dataToSendOnline.userSettings = userSettings?userSettings:{}
        Object.keys(moodleData).map(function(i, j) {
          html = $(moodleData[i]["innerHTML"]);
          dataToSendOnline[i] = {};
          html.find("p .item-content-wrap").each(function() {
            childrenIds = $(this)
              .parent()
              .parent()
              .parent()
              .children("ul")
              .children("li")
              .children("p")
              .toArray()
              .map(function(k) {
                return k.id;
              });

            elemId = $(this)
              .parent()
              .parent()
              .attr("id");
            elemId = elemId ? elemId : "no_id";

            imgHref = $(this)
              .siblings("img")
              .attr("src");
            imgHref = imgHref ? imgHref : null;

            imgAlt = $(this)
              .siblings("img")
              .attr("alt");
            imgAlt = imgAlt ? imgAlt : null;

            link = $(this)
              .parent()
              .attr("href");
            link = link ? link : null;

            dataToSendOnline[i][elemId] = {
              text: $(this).html(),
              children: childrenIds,
              imgAlt: imgAlt,
              img: imgHref,
              link: link
            };
          });
        });
        console.log("sending data:", dataToSendOnline);
        if (!localStorage.getItem("userid")) {
          db.collection("dba")
            .doc(emailAddress)
            .set(dataToSendOnline)
            .then(function() {
              localStorage.setItem("userid", emailAddress);
              console.log("permanentref= " + emailAddress);
              chrome.storage.local.set({lastOnlineSync: Date.now()});
            });
        } else {
          db.collection("dba")
            .doc(localStorage.getItem("userid"))
            .set(dataToSendOnline)
            .then(function() {
              console.log(
                "successful overwrite: " + localStorage.getItem("userid")
              );
            });
        }
      });
    }
  });
});
