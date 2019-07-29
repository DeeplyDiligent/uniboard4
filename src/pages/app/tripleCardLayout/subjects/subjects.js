import React, { Component } from "react";
import SearchBar from "../../navbar/searchBar";
import database from "../../../../data/main";
class Subjects extends Component {
  state = { subjectList: database.getSubjectList() };

  render() {
    return (
      <div className="flex-none rounded overflow-hidden custom-shadow py-4 w-64 bg-white flex-grow">
        <div className="font-bold text-4xl px-6 pb-2">Subjects</div>
        <div className="border-t border-gray-300" />
        <div>
          {this.state.subjectList.map((subject,i) => (
            <div onClick={()=>this.props.changeSelectedSubject(subject.id)} key={i} className="cursor-pointer border-solid  border-gray-300 hover:bg-purple-100 hover:text-purple-800 px-6 text-sm font-semibold text-gray-700 py-4">
              {subject.shortname}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Subjects;
