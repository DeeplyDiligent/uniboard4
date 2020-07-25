import React, { Component } from "react";
import SearchBar from "../navbar/searchBar";
import { Scrollbars } from "react-custom-scrollbars";
import UnitBoard from "./unitBoard";
import Logo from "../navbar/logo";
import CalButton from "../navbar/calButton";
import SettingsButton from "../navbar/settingsButton";
import SearchScreen from "../search/searchScreen";
import ChatButton from "../navbar/chatButton";
import ActeaAd from "../navbar/acteaAd";

class SubjectLayout extends Component {
  state = { search: "" };
  searchNewString=(string) =>{
    this.setState({search:string})
  }
  render() {
    return (
      <div className="h-full flex overflow-auto flex-grow flex-col bg-gray-100">
        <div className="flex m-auto mt-3">
          <Logo />
          <SearchBar searchNewString={this.searchNewString} className="w-64" />
          <CalButton />
          <ActeaAd/>
          <SettingsButton />
          <ChatButton />
        </div>
        <div className="flex flex-grow overflow-auto h-full max-w-full px-2">
          {this.state.search ? (
            <SearchScreen searchString={this.state.search} />
          ) : (
            <React.Fragment>
              {Object.keys(this.props.subjectData).map((key, index) => {
                return (
                  <UnitBoard
                    unitData={this.props.subjectData[key]}
                    unitId={key}
                    key={index}
                    number={index}
                  />
                );
              })}
            </React.Fragment>
          )}
          <div>&nbsp;</div>
          {/* required for margin on right hand side */}
        </div>
      </div>
    );
  }
}

export default SubjectLayout;
