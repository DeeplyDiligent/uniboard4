import React, { Component } from "react";
import TripleCardLayout from "./tripleCardLayout/tripleCardLayout";
import SearchBar from "./navbar/searchBar";
import database from "../../data/main";
import SubjectLayout from "./subjectLayout/subjectLayout";
class MainApp extends Component {
  state = { defaultLayout: database.getDefaultLayout() };
  componentDidMount() {
    // database.refreshSelectedSubjectData()
  }
  render() {
    if (this.props.subjectData) {
      if (this.state.defaultLayout === "subjectLayout") {
        return <SubjectLayout subjectData={this.props.subjectData} />;
      } else if (this.state.defaultLayout === "tripleCardLayout") {
        return (
          <div className="flex flex-col flex-grow h-full bg-gray-100 " style={{width:"fit-content"}}>
            {/* <div className="m-auto">
          <SearchBar />
        </div> */}
            <TripleCardLayout subjectData={this.props.subjectData} />
          </div>
        );
      }
    }
    return false;
  }
}

export default MainApp;
