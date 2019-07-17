import React, { Component } from "react";
import database from "./data/main";
import "./css/app.css";
import FirstLoad from "./pages/firstLoad/firstLoad";
import Loader from "./components/reused/loader";
import MainApp from "./pages/app/mainApp";

class App extends Component {
  state = { loading: true, data: null };
  componentDidMount() {
    database.getUniboardDataUpdates(this.processUniboardData);
  }
  processUniboardData = (allData) => {
    this.setState({data:allData, loading:false});
  }

  render() {
    console.log('data',this.state.data);
    if (this.state.loading) {
      return (
        <div className="center-on-page">
          <Loader />
        </div>
      );
    } else if (!this.state.data) {
      return <FirstLoad commitSubjectsAndCloudSync = {this.commitSubjectsAndCloudSync} />
    } else {
      return <MainApp />;
    }
    
  }
}

export default App;
