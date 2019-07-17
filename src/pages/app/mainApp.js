import React, { Component } from "react";
import TripleCardLayout from "./tripleCardLayout/tripleCardLayout";
import SearchBar from "./search/searchBar";
import database from "../../data/main";
class MainApp extends Component {
  state = {};
  componentDidMount(){
    // database.refreshSelectedSubjectData()
  }
  render() {
    return (
      <div className="flex flex-col h-full bg-gray-100">
        {/* <div className="m-auto">
          <SearchBar />
        </div> */}
        <TripleCardLayout />
      </div>
    );
  }
}

export default MainApp;
