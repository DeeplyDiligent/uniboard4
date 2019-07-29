import React, { Component } from "react";
import LinkButton from "./linkButton";

class NoAttachments extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-col">
        <a
          className="mx-auto mt-6"
          target="_blank"
          rel="noopener noreferrer"
          href={this.props.attachments.link}
        >
          <LinkButton text="Click Here to go visit Moodle" />
        </a>
        <div
          className="text-center text-gray-300 mt-10 text-3xl"
          style={{ flexGrow: "1" }}
        >
          No Attachments In This Section
        </div>
      </div>
    );
  }
}

export default NoAttachments;
