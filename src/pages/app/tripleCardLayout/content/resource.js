import React, { Component } from "react";
import popup from "../../../../components/popupFile";
import database from "../../../../data/main";
/*global chrome*/
class Resource extends Component {
  state = {};
  resourceIcon = icon => {
    let src = database.getIcon(icon);
    return (
      <img
        src={src}
        style={{ display: "inline-block", width: "24px", height: "24px" }}
      />
    );
  };

  download = link => {
    console.log(this.props.resource);
    chrome.downloads.download({
      url: link + "&redirect=1"
    });
  };

  openLink = () => {
    if (this.props.resource.icon.title === "Folder") {
      popup.newWebsitePopup(
        this.props.resource.link,
        this.props.resource.icon.title
      );
    } else {
      window.open(this.props.resource.link);
    }
  };

  render() {
    let resourceIcon = this.resourceIcon(this.props.resource.icon);
    if (this.props.resource.icon.pix.includes("f/")) {
      return (
        <div className="inline-flex rounded-full m-2 ml-0">
          <button
            onClick={this.openLink}
            className="bg-purple-100 hover:bg-purple-200 text-gray-800 font-bold pl-4 pr-2 py-2 rounded-l-full">
            {resourceIcon}
            <span className="mx-2">
              {this.props.resource.name}
              <i className="fas fa-external-link-alt ml-2" />
            </span>
          </button>
          <button
            style={{ marginLeft: "2px" }}
            className="bg-purple-100 hover:bg-purple-200 text-gray-800 font-bold pr-4 pl-3 py-2 rounded-r-full"
            onClick={() => this.download(this.props.resource.link)}>
            <i className="fas fa-file-download" />
          </button>
        </div>
      );
    }
    return (
      <button
        onClick={() => this.openLink(this.props.resource.link)}
        className="bg-purple-100 hover:bg-purple-200 text-gray-800 font-bold pl-4 pr-2 py-2 rounded-full m-2 ml-0">
        {resourceIcon}
        <span className="mx-2">
          {this.props.resource.name}
          <i className="fas fa-external-link-alt ml-2" />
        </span>
      </button>
    );
  }
}

export default Resource;
