import React, { Component } from "react";
class SearchBar extends Component {
  state = {};
  render() {
    return (
      <div className={`flex py-3 mx-6 ${this.props.className}`}>
        <i className="fas fa-search pr-3 mt-2" />
        <div className="border-b border-b-2 border-purple-200 hover:border-purple-500 flex-grow">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 pr-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search Everything"
            aria-label="Search"
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
