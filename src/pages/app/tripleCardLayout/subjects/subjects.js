import React, { Component } from "react";
import SearchBar from "../../search/searchBar";
class Subjects extends Component {
  state = {};

  render() {
    return (
      <div className="flex-none rounded overflow-hidden custom-shadow mr-3 py-4 w-64 bg-white">
        <div className="font-bold text-4xl px-6 pb-2">Subjects</div>
        <div className="border-t border-gray-300" />
        <div className="">
          <div className="cursor-pointer border-solid  border-gray-300 hover:bg-purple-100 hover:text-purple-800 px-6 text-sm font-semibold text-gray-700 py-4">
            FIT2002
          </div>
          <div className="cursor-pointer border-solid border-gray-300 px-6 hover:bg-purple-100 hover:text-purple-800 text-sm font-semibold text-gray-700 py-4">
            FIT2002
          </div>
          <div className="cursor-pointer border-solid border-gray-300 px-6 hover:bg-purple-100 hover:text-purple-800 text-sm font-semibold text-gray-700 py-4">
            FIT2002
          </div>
          <div className="cursor-pointer border-solid border-gray-300 px-6 hover:bg-purple-100 hover:text-purple-800 text-sm font-semibold text-gray-700 py-4">
            FIT2002
          </div>
        </div>
      </div>
    );
  }
}

export default Subjects;
