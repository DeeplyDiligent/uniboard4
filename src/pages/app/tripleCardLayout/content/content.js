import React, { Component } from "react";
import ResourcesForWeek from "./resourcesForWeek";
import $ from "jquery";
class Content extends Component {
  state = {};
  scrollTop = () => {
    if (this.props.section) {
      var myElement = document.getElementById(this.props.section);
      if(myElement){
        var topPos = myElement.offsetTop;
        document.getElementById('content').scrollTop = topPos-70;
      }
      
    }
  };
  render() {
    this.scrollTop();
    return (
      <div
        id="content"
        className="rounded overflow-auto custom-shadow flex-grow bg-white">
        <div className="px-6 py-4">
          {Object.values(this.props.subjectClickedData)
            .slice(1)
            .map((week, i) => (
              <div className="flex" key={i} id={week.key}>
                <div> </div>
                <div>
                  <div className="font-bold text-2xl mb-2">{week.name}</div>
                  <ResourcesForWeek
                    weekChildren={week.children}
                    weekLink={week.link}
                    index={i}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Content;
