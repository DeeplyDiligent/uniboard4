const functions = require("firebase-functions");
var req = require("request-promise");
var express = require('express');

exports.getSubjectDataFromMoodle = functions.https.onRequest(
  (request, response) => {
    let subjects = JSON.parse(request.query.subjects);
    let cookie = request.query.cookie;

    async function getAll(id, type, subjectid) {
      const navData = await req({
        url:
          "https://lms.monash.edu/lib/ajax/getnavbranch.php?id=" +
          id +
          "&type=" +
          type,
        method: "POST",
        headers: { Cookie: cookie }
      });
      let data = JSON.parse(navData);
      done++;
      a[subjectid][data.key] = data;

      if (data.children && data.children[0]) {
        data.children.map((x, i) => {
          console.log("get started for ", x.expandable, x.type);
          if (x.expandable) {
            getAll(x.expandable, x.type, subjectid);
            counter++;
          }
        });
      }

      console.log(done, "/", counter);
      if (done === counter) {
        response.send(JSON.stringify(a));
      }
    }

    let a = {};
    let counter = subjects.length;
    let done = 0;
    subjects.map(subjectId => {
      a[subjectId] = {};
      getAll(subjectId, 20, subjectId);
    });
  }
);


exports.getCookie = functions.https.onRequest(
  (request, response) => {
    console.log(request)
    response.send(request.cookies['MoodleSession'])
  }
);
