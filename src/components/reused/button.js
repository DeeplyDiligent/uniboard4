import React, { Component } from "react";
class Button extends Component {
  state = {};
  render() {
    return (
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" {...this.props}>
        <React.Fragment>{this.props.children}</React.Fragment>
      </button>
    );
  }
}

export default Button;
