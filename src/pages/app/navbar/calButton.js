import React, { Component } from "react";
import { Link } from "react-router-dom";
import database from "../../../data/main";
import moment from 'moment';
class CalButton extends Component {
  state = { events: [] };
  componentDidMount() {
    console.log(moment().add(1, "W").unix().toString())
    database.getCalendarEvents(moment().add(1, "W").unix().toString()).then(x => this.setState({ events: x }));
  }
  render() {
    return (
      <Link to="/calendar/">
        <button
          title="Calendar"
          className="flex h-8 mt-2 bg-transparent hover:bg-purple-400 text-purple-600 font-semibold hover:text-white  border border-purple-400 px-3 hover:border-transparent rounded text-3xl">
          <i className="fas fa-calendar-alt text-xl self-center" />
          <div className="leading-none ml-2 self-center text-xl">
            {this.state.events.length} <span className="text-sm">this week</span>
          </div>
        </button>
      </Link>
    );
  }
}

export default CalButton;
