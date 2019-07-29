import React, { Component } from "react";
import database from "../../../data/main";
import Moment from "react-moment";
class RefreshDataComponent extends Component {
  state = { updateInProgress: false, lastUpdated: null };
  componentDidMount() {
    database.getLoadingNowUpdates(this.setRefreshLoadingNow);
  }
  setRefreshLoadingNow = state => {
    this.setState({ updateInProgress: state });
  };
  refresh = () => {
    let subjects = database.getSubjectList();
    database.fetchSubjectDataController(subjects);
  };
  render() {
    return (
      <div
        onClick={this.refresh}
        className="bg-white text-black font-bold py-1 pr-3 pl-2 py-2 rounded table mt-1 custom-shadow cursor-pointer mt-3">
        <span
          className="text-white rounded-full mr-3"
          style={{ padding: "0px 4px", background: "#7c4bff" }}>
          <i
            className={
              "fas fa-sync-alt text-white px-1 " +
              (this.state.updateInProgress ? "rotate-center" : "")
            }
          />
        </span>
        <span className="text-gray-700 text-sm font-normal">Refresh Subjects</span>
      </div>
    );
  }
}

export default RefreshDataComponent;
