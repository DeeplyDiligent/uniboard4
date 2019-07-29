import React, { Component } from "react";
import WeekSlider from "../subjectLayout/weekSlider/weekSlider";
import database from "../../../data/main";
import moment from "moment";
class Calendar extends Component {
  state = { events: [], loading: true};
  componentDidMount() {
    database.getCalendarEvents().then(x => this.setState({ events: x , loading: false}));
  }
  render() {
    if (this.state.events === "error") {
      return <WeekSlider>Invalid Sesskey. Refresh page.</WeekSlider>;
    } else if (!this.state.loading && this.state.events.length) {
      return (
        <WeekSlider>
          <div className="text-2xl font-bold">Your Planner</div>
          <div className="bg-red-400 brow my-4" />
          {this.state.events.map((event, i) => (
            <a
              target="_blank"
              href={event.url}
              key={i}
              className="block no-underline text-white bg-blue-500 hover:bg-blue-600 text-white font-bold p-4 my-2 rounded w-full">
              <div>
                <div>{event.name}</div>
                <div>{event.course.shortname}</div>
              </div>
              <div className="text-sm mt-3">
                {moment
                  .unix(event.timestart)
                  .format("dddd, MMM DD, h:mm A")
                  .toString()}
              </div>
            </a>
          ))}
        </WeekSlider>
      );
    }else if (this.state.loading){
      return <WeekSlider> Loading...</WeekSlider>;
    } 
    return <WeekSlider>You have no events :)</WeekSlider>;
  }
}

export default Calendar;
