import React, { Component } from "react";
import $ from "jquery";
import PerfectScrollbar from "react-custom-scrollbars";
/*global chrome*/

class ShowWeekText extends Component {
  state = { text: "" };
  getFullHtml(data, className) {
    var fullHtml = "";
    $(data)
      .find(className)
      .each(function() {
        fullHtml = fullHtml + $(this).html();
      });
    if (fullHtml === "") {
      return "no-content";
    }
    return fullHtml;
  }
  prepareLink(link) {
    link = link.replace("#", "&").replace("-", "=");
    let parsedLink = new URL(link);
    this.section = parsedLink.searchParams.get("section");
    return link;
  }

  componentDidMount() {
    $.ajax({
      url: this.prepareLink(this.props.link),
      context: document.body
    }).done(this.showData);
  }
  showData = data => {
    this.setState({
      text: this.getFullHtml(
        data,
        `#section-${this.section} .content .modtype_label, #section-${
          this.section
        } .content .summary`
      )
    });
  };
  setHtmlOfSidebar = () => {
    return { __html: this.state.text };
  };
  setPropertiesInHtml = () => {
    $("#pagecontent *").css({ width: "100%" });
    $("#pagecontent a").attr("target", "_blank");
  };
  componentDidUpdate() {
    this.setPropertiesInHtml();
  }
  render() {
    if (this.state.text && this.state.text !== "no-content") {
      return (
        <div className="mt-3 overflow-hidden shadow rounded table">
          <PerfectScrollbar autoHide autoHeight autoHeightMax={"35vh"}>
            <div
              id="pagecontent"
              class="break-words p-2"
              style={{ lineHeight: "2" }}
              dangerouslySetInnerHTML={this.setHtmlOfSidebar()}
            />
          </PerfectScrollbar>
        </div>
      );
    } else if (this.state.text === "no-content") {
      return false;
    }
    return (
      <div className="mt-3 overflow-hidden p-3 shadow rounded text-center table">
        <PerfectScrollbar autoHide autoHeight autoHeightMin={75}>
          <i class="fas fa-circle-notch fa-spin text-5xl" />
        </PerfectScrollbar>
      </div>
    );
  }
}

export default ShowWeekText;
