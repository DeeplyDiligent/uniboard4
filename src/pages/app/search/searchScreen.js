import React, { Component } from "react";
import SearchCard from "./searchCard";
import fuzzysort from "fuzzysort";
import database from "../../../data/main";

class SearchScreen extends Component {
  state = {};
  constructor(props){
      super(props);
      this.flatArray = database.transformToFlatArray();
      this.subjectList = database._getSubjectData()
  }
  render() {
    let searchString = this.props.searchString.trim().toLowerCase();
    this.allData = [];
    if (searchString && searchString.length > 0) {
      this.allData = this.flatArray;
      this.allData = fuzzysort.go(searchString, this.allData, {
        key: "searchString"
      });
    }
    let SearchResultsClasses = {};
    SearchResultsClasses.maxWidth = this.props.maxWidth
      ? this.props.maxWidth
      : "";
    if (searchString) {
      return (
        <div
          className={`flex-grow m-auto max-w-sm container overflow-auto ${
            SearchResultsClasses.maxWidth
          } mt-2`}
        >
          {this.allData.slice(0, 30).map((i, j) => (
            <SearchCard
              key={j}
              link={i.obj.link}
              img={database.getIcon(i.obj.icon)}
              text={i.obj.name}
              subject={database.getSubjectName(i.obj.subject, this.subjectList )}
              searchString={searchString}
            />
          ))}
        </div>
      );
    }
    return false;
  }
}

export default SearchScreen;
