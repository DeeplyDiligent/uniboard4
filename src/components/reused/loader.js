import React, { Component } from "react";
class Loader extends Component {
  state = {};
  render() {
    return (
        <i className="fas fa-circle-notch fa-spin text-5xl" />
    );
  }
}

export default Loader;
