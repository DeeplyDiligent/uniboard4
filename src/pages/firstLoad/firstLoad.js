import React, { Component } from "react";
/*global chrome*/

class FirstLoad extends Component {
  state = {};
  render() {
    return (
      <div className="bg-purple-100 h-full w-full">
        <div className="w-full md:max-w-2xl rounded-lg overflow-hidden shadow-lg center-on-page bg-white">
          <div className="w-full" style={{ background: "#7c4afc" }}>
            <img
              style={{ width: "30em" }}
              className="px-12 py-10  m-auto"
              src={chrome.extension.getURL("img/uniboard-white.svg")}
              alt="Sunset in the mountains"
            />
          </div>
          <div className="px-6 py-4">
            <div className="text-sm mb-2 text-gray-500">
              Uniboard Setup | Step 1 of 3
            </div>
            <div className="font-bold text-xl mb-2">
              Please Select your subjects below:
            </div>
            <p className="text-sm mb-2 text-gray-500">
              From the team at UniBoard, we sincerely thank you for using our
              product!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default FirstLoad;
