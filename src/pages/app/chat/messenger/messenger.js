import React, { Component } from "react";
import ChatPage from "./chatPage";
import AsyncCreatableSelect from "react-select/lib/AsyncCreatable";
import database from "../../../../data/main";

class Messenger extends Component {
  state = {
    userName: "",
    proceed: true,
    subjects: false,
    refreshSelect: true,
    showSelect: false
  };
  // handleChange = newValue => {
  //   this.setState({ selectedSubject: newValue });
  // };

  componentDidMount() {
    // database.getAllChatRooms().then(subjectList => {
    //   let optionSubjectList = subjectList.map(function(x) {
    //     return { value: x, label: x };
    //   });
    //   this.setState({
    //     subjects: optionSubjectList,
    //     refreshSelect: !this.state.refreshSelect,
    //     showSelect: true
    //   });
    // });
  }

  filterSubjects = inputValue => {
    return this.state.subjects.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  promiseOptions = inputValue =>
    new Promise(resolve => {
      resolve(this.filterSubjects(inputValue));
    });

  chatStart = () => {
    if (this.props.selectedSubject) {
      this.setState({ proceed: true });
    }
  };
  goBackToChoose = () => {
    this.setState({ proceed: false, showSelect: false });
    this.componentDidMount();
  };

  render() {
    console.log(this.state.showSelect);
    if (this.state.proceed) {
      return (
        <ChatPage
          subject={this.props.selectedSubject}
          goBack={this.goBackToChoose}
        />
      );
    } else if (!this.state.subjects) {
      return (
        <div className="center-on-page"><i className="fas fa-circle-notch fa-spin text-5xl" /></div>
      );
    }
    return (
      <div className="center-on-page">
        Select Room:
        <div className="text-grey-darker pt-4">
          Start typing the name of a subject to create a room!
        </div>
        {this.state.showSelect ? (
          <AsyncCreatableSelect
            className="pt-4 w-full"
            isClearablecacheOptions
            defaultOptions
            loadOptions={this.promiseOptions}
            onChange={this.handleChange}
            key={this.state.refreshSelect}
          />
        ) : (
          <div className="block">
            <i className="fas fa-circle-notch fa-spin text-5xl text-center mt-4" />
          </div>
        )}
        <button
          className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="button"
          onClick={this.chatStart}
        >
          Lets Chat!&emsp;
          <i className="fa fa-chevron-right" />
        </button>
      </div>
    );
  }
}

export default Messenger;
