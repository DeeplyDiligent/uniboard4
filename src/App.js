import React, { Component } from "react";
import database from "./data/main";
import "./css/app.css";
import FirstLoad from "./pages/firstLoad/firstLoad";

class App extends Component {
  state = { loading: true, data: null };
  componentDidMount() {
    database.getUniboardDataUpdates(this.processUniboardData);
  }
  processUniboardData = (allData) => {
    this.setState({data:allData, loading:false});
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="center-on-page">
          <i className="fas fa-circle-notch fa-spin text-5xl" />
        </div>
      );
    } else if (!this.state.data) {
      return <FirstLoad />
    } else {
      return <div>App</div>;
    }
    
  }
}

export default App;
