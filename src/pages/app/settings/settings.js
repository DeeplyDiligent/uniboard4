import React, { Component } from "react";
import WeekSlider from "../subjectLayout/weekSlider/weekSlider";
import Switch from "react-switch";
import database from "../../../data/main";
import SubjectList from "../../firstLoad/subjectList";
import RefreshDataComponent from "../navbar/refreshDataComponent";
/* global chrome */
class Settings extends Component {
  state = {
    checked: database.getDefaultLayout() === "tripleCardLayout" ? true : false,
    selectedSubjects: database.getSubjectList()
  };
  handleChange = checked => {
    database.setDefaultLayout(checked ? "tripleCardLayout" : "subjectLayout");
    this.setState({ checked });
    window.location.href = chrome.extension.getURL("index.html");
  };
  setSelectedSubjects = selectedSubjects => {
    this.setState({ selectedSubjects: selectedSubjects });
  };
  commitSubjectsAndCloudSync = () => {
    database.commitSubjectNamesAndCloudSync(
      this.state.selectedSubjects,
      this.state.cloudSync
    );
  };
  render() {
    return (
      <WeekSlider>
        <div className="text-2xl font-bold">Settings</div>
        <div className="bg-red-400 brow my-4" />
        <label htmlFor="material-switch" className="flex">
          <Switch checked={this.state.checked} onChange={this.handleChange} />
          <span className="pl-3">Easy Mode</span>
        </label>
        <div className="mt-8"></div>
        <RefreshDataComponent />
        <div className="mt-6 text-xl">Subjects</div>
        <SubjectList
          className="w-full"
          setSelectedSubjects={this.setSelectedSubjects}
        />
        <button onClick={this.commitSubjectsAndCloudSync} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Save
        </button>
      </WeekSlider>
    );
  }
}

export default Settings;
