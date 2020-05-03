import React, { Component } from "react";
import SearchBar from "./searchBar";
import RefreshDataComponent from "./refreshDataComponent";
import Logo from "./logo";
import Calendar from "../calendar/calendar";
import Settings from "../settings/settings";
import CalButton from "./calButton";
import ChatButton from "./chatButton";
import SettingsButton from "./settingsButton";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="flex">
        <Logo />
        <SearchBar className="w-64" />
        <CalButton />
        <SettingsButton />
        <ChatButton />
      </div>
    );
  }
}

export default Navbar;
