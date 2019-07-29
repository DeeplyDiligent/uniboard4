import React, { Component } from "react";
import database from "../../data/main";
import Loader from "../../components/reused/loader";
import Checkbox from "../../components/reused/checkbox";
class SubjectList extends Component {
  state = { subjects: null, selectedSubjects: [] };
  componentDidMount() {
    database
      .fetchSubjects()
      .then(subjectData =>
        this.setState({ subjects: this.prepareSubjects(subjectData) })
      );
  }
  prepareSubjects(subjects) {
    let subjectDict = {};
    subjects.map(x => {
      if (x.id) {
        x.checked = this.checkIfSubjectChecked(x.id);
        subjectDict[x.id] = x;
      }
    }); 
    return subjectDict;
  }
  checkIfSubjectChecked(subjectId){
    return (database.getSubjectList().map(x=>x.id).includes(subjectId))
  }
  updateSubjectSelected = (id, checkedStatus) => {
    let subjectData = this.state.subjects;
    subjectData[id]["checked"] = checkedStatus;
    this.setState({ subjectData: subjectData });
    this.props.setSelectedSubjects(Object.values(subjectData).filter(subject=>subject.checked))
  };
  render() {
    if (this.state.subjects) {
      return (
        <div className={"rounded-lg border-gray-400 border text-left bg-white my-4 px-4 w-3/4 mx-auto h-48 py-2 overflow-auto "+this.props.className}>
          {Object.values(this.state.subjects)
            .reverse()
            .map((subject, i) => {
              return (
                <Subject
                  key={i}
                  subjectData={subject}
                  updateSubjectSelected={this.updateSubjectSelected}
                />
              );
            })}
        </div>
      );
    }
    return <Loader />;
  }
}

class Subject extends Component {
  handleCheckboxChange = event => {
    this.props.updateSubjectSelected(
      this.props.subjectData.id,
      event.target.checked
    );
  };
  render() {
    return (
      <label className="py-1 flex">
        <Checkbox
          checked={this.props.subjectData.checked}
          onChange={this.handleCheckboxChange}
        />
        <div style={{ marginLeft: 8, marginTop: -3 }}>
          {this.props.subjectData.fullname}
        </div>
      </label>
    );
  }
}

export default SubjectList;
