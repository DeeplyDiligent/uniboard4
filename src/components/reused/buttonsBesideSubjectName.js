import React, { Component } from "react";
class ButtonsBesideSubjectName extends Component {
  state = {};
  render() {
    return (
      <button
        onClick={this.props.onClick}
        title={this.props.title}
        className="bg-white hover:bg-purple-100 text-purple-600 font-bold py-1 px-1 rounded focus:outline-none">
        {this.props.text}
      </button>
    );
  }
}

export default ButtonsBesideSubjectName;
