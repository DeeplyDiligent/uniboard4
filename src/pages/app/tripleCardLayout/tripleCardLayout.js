import React, { Component } from "react";
import Subjects from "./subjects/subjects";
import Content from "./content/content";
import Weeks from "./weeks/weeks";
import SearchBar from "../search/searchBar";
class TripleCardLayout extends Component {
  state = {};
  render() {
    return (
      <div className="mx-4 my-4 flex-grow flex">
        <Subjects />
        <Weeks />
        <div className="flex-1 flex flex-col flex-grow">
          <SearchBar className="w-64"/>
          <Content />
        </div>
      </div>
    );
  }
}

export default TripleCardLayout;
