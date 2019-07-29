import React, { Component } from "react";
import Subjects from "./subjects/subjects";
import Content from "./content/content";
import Weeks from "./weeks/weeks";
import SearchBar from "../navbar/searchBar";
import Navbar from "../navbar/navbar";
import RefreshDataComponent from "../navbar/refreshDataComponent";
class TripleCardLayout extends Component {
  state = {weekData:Object.values(this.props.subjectData)[0], contentSection:null };
  changeSelectedSubject = (newSubjectId)=>{
    this.setState({weekData:this.props.subjectData[newSubjectId]})
  }
  scrollTo = (section) => {
    this.setState({contentSection:section});
  }
  componentWillReceiveProps(nextProps) {
    this.setState({weekData:Object.values(nextProps.subjectData)[0]})
  }
  render() {
    return (
      <div className="mx-4 my-4 flex-grow flex">
         <div className="flex-1 flex flex-col flex-grow-0 mr-3">
          <Subjects changeSelectedSubject={this.changeSelectedSubject} />
          <RefreshDataComponent />
        </div>
        <Weeks subjectClickedData={this.state.weekData} scrollTo = {this.scrollTo}/>
        <div className="flex-1 flex flex-col flex-grow">
          <Navbar /> 
          <Content section={this.state.contentSection} subjectClickedData={this.state.weekData}/>
        </div>
      </div>
    );
  }
}

export default TripleCardLayout;
