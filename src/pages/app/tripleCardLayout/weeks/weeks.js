import React, { Component } from "react";
class Weeks extends Component {
  state = {};
  render() {
    return (
      <div className="flex-none flex flex-col h-full rounded overflow-hidden mr-3 w-64 bg-white custom-shadow">
        <div className="font-bold text-4xl mb-2 px-6 pt-4">Weeks</div>
        <div className="border-t border-gray-300 flex-" />
        <div className="overflow-auto">
          {Object.values(this.props.subjectClickedData).slice(1).map((branch, i) => (
            <div
              onClick={()=>this.props.scrollTo(branch.key)}
              key={i}
              className="cursor-pointer border-solid border-gray-300 hover:bg-purple-100 hover:text-purple-800 px-6 text-sm font-semibold text-gray-700 py-4">
              {branch.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Weeks;
