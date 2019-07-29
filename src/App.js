import React, { Component } from "react";
import database from "./data/main";
import "./css/app.css";
import FirstLoad from "./pages/firstLoad/firstLoad";
import Loader from "./components/reused/loader";
import MainApp from "./pages/app/mainApp";
import WeekSlider from "./pages/app/subjectLayout/weekSlider/weekSlider";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WeekSliderForBranch from "./pages/app/subjectLayout/weekSlider/weekSliderForBranch";
import Calendar from "./pages/app/calendar/calendar";
import Settings from "./pages/app/settings/settings";
import moment from "moment";

class App extends Component {
  state = { loading: true, data: null, subjectsSelected: null };
  componentDidMount() {
    database.getUniboardDataUpdates(this.processUniboardData);
    if (moment(database.getLastUpdateDate()).add("hours", 4) < moment()) {
      let subjects = database.getSubjectList();
      database.fetchSubjectDataController(subjects);
    }
  }
  processUniboardData = allData => {
    this.setState({ data: allData, loading: false });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="center-on-page">
          <Loader />
        </div>
      );
    } else if (!this.state.data.subjectList) {
      return <FirstLoad />;
    } else {
      return (
        <Router>
          <div className="flex overflow-x-hidden w-full h-full">
            <MainApp subjectData={this.state.data.subjectData} />
            <Route
              path="/sidebar/:unitid/:branchid"
              exact
              component={WeekSliderForBranch}
            />
            <Route path="/calendar" exact component={Calendar} />
            <Route path="/settings" exact component={Settings} />
          </div>
        </Router>
      );
    }
  }
}

export default App;
