import React, { Component } from "react";
import database from "../../data/main";
import SubjectList from "./subjectList";
import Button from "../../components/reused/button";
/*global chrome*/

class Step1SubjectSelect extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="text-sm mb-2 text-gray-500">
          Uniboard Setup | Step 1 of 2
        </div>
        <div className="font-bold text-xl mb-2">
          Please Select your subjects below:
        </div>
        <SubjectList setSelectedSubjects={this.props.setSelectedSubjects} />
        <p className="text-sm mb-2 text-gray-500">
          From the team at UniBoard, we sincerely thank you for using our
          product!
        </p>
        <Button onClick={this.props.nextStep}>
          Next Step &nbsp; <i className="fas fa-chevron-right" />
        </Button>
      </React.Fragment>
    );
  }
}

export default Step1SubjectSelect;
