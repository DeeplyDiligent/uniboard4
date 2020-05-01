import React, { Component } from "react";
import WeekSlider from "../subjectLayout/weekSlider/weekSlider";
import database from "../../../data/main";
import moment from "moment";
import Messenger from "./messenger/messenger";
class Chat extends Component {
  render() {
    console.log(this.props)
    let params = this.props.match.params
    return (
      <WeekSlider minWidth="500px">
        <Messenger selectedSubject={{id: params.unitId, label:params.unitName}} />
      </WeekSlider>
    );
  }
}

export default Chat;
