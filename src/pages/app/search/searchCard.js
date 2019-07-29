import * as React from "react";
import fuzzysort from "fuzzysort";

class SearchCard extends React.Component {
  state = {};
  highlight(string) {
    let highlightedString = fuzzysort.highlight(
      fuzzysort.single(this.props.searchString, string),
      "<mark>",
      "</mark>"
    );
    return {
      __html: highlightedString ? highlightedString : string
    };
  }
  render() {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="my-2 flex rounded overflow-hidden shadow m-2 p-2 bg-white"
        href={this.props.link}
        style={{
          color: "black",
          textDecoration: "none"
        }}
      >
        <img
          style={{ height: "fit-content", width:"24px", height:"24px" }}
          className="mr-2 mt-1"
          src={this.props.img}
        />
        <div>
          <div
            dangerouslySetInnerHTML={this.highlight(
              this.props.subject
            )}
          />
          <div
            className="text-lg"
            dangerouslySetInnerHTML={this.highlight(this.props.text)}
          />
        </div>
      </a>
    );
  }
}

export default SearchCard;
