import React, { Component } from "react";
class Weeks extends Component {
  state = {};
  render() {
    return (
      <div className="flex-none rounded overflow-hidden mr-3 w-64 bg-white custom-shadow">
        <div className="font-bold text-4xl mb-2 px-6 pt-4">Weeks</div>
        <div className="border-t border-gray-300" />
        <div className="cursor-pointer border-solid border-gray-300 hover:bg-purple-100 hover:text-purple-800 px-6 text-sm font-semibold text-gray-700 py-4">
          Week 1
        </div>
        <div className="cursor-pointer border-solid border-gray-300 hover:bg-purple-100 hover:text-purple-800 px-6 text-sm font-semibold text-gray-700 py-4">
          Week 2
        </div>
        <div className="cursor-pointer border-solid border-gray-300 hover:bg-purple-100 hover:text-purple-800 px-6 text-sm font-semibold text-gray-700 py-4">
          Week 3
        </div>
      </div>
    );
  }
}

export default Weeks;
