import React, { Component } from "react";
import Step1SubjectSelect from "./step1SubjectSelect";
import Step2LoadSubjectContent from "./step2LoadSubjectContent";
import Loader from "../../components/reused/loader";
import database from "../../data/main";
/*global chrome*/

class FirstLoad extends Component {
  state = { selectedSubjects: [], step: 1, cloudSync: false };
  setSelectedSubjects = selectedSubjects => {
    this.setState({ selectedSubjects: selectedSubjects });
  };
  setCloudSync = cloudSync => {
    this.setState({ cloudSync: cloudSync });
  };
  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };
  commitSubjectsAndCloudSync = () => {
    database.commitSubjectNamesAndCloudSync(
      this.state.selectedSubjects,
      this.state.cloudSync
    );
  };
  render() {
    if (this.state.step === 1) {
      return (
        <Popup>
          <Step1SubjectSelect
            setSelectedSubjects={this.setSelectedSubjects}
            nextStep={this.nextStep}
          />
        </Popup>
      );
    } else if (this.state.step === 2) {
      return (
        <Popup>
          <Step2LoadSubjectContent
            nextStep={this.nextStep}
            setCloudSync={this.setCloudSync}
          />
        </Popup>
      );
    } else if (this.state.step === 3) {
      this.commitSubjectsAndCloudSync();
      return (
        <Popup>
          <Loader />
        </Popup>
      );
    }
  }
}

class Popup extends Component {
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
          <div className="px-6 py-4">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default FirstLoad;
