import React, { Component } from "react";
import Resource from "./resource";
import PageText from "./pageText";
class ResourcesForWeek extends Component {
  state = {};
  render() {
    if (this.props.weekChildren) {
      return (
        <div className="flex flex-col">
          {/* <PageText link={this.props.weekLink} key={this.props.index}/> */}
          <div className="flex flex-wrap">
            {this.props.weekChildren.map((resource, i) =>
              resource ? (
                <div key={i}>
                  <Resource resource={resource} />
                </div>
              ) : (
                false
              )
            )}
          </div>
        </div>
      );
    }
    return false;
  }
}

export default ResourcesForWeek;
