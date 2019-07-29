import React, { Component } from "react";
import $ from "jquery";
/*global chrome*/

class PageText extends Component {
  state = { text: "" };
  getFullHtml(data, className) {
    var fullHtml = "";
    $(data)
      .find(className)
      .each(function() {
        fullHtml = fullHtml + " " + $(this).html();
      });
    let text = $(fullHtml)
      .text()
      .substr(0, 100);
    if (text === "") {
      return "no-content";
    }
    return text;
  }
  prepareLink(link) {
    link = link.replace("#", "&").replace("-", "=");
    let parsedLink = new URL(link);
    this.section = parsedLink.searchParams.get("section");
    return link;
  }

  componentDidMount() {
    console.log(this.isInViewport());
    if (this.props.link && this.isInViewport()) {
      this.startFetch();
    } else if (this.props.link){
        $("#content").on("scroll",()=>{
            console.log(this.isInViewport())
            if(this.isInViewport()){
                this.startFetch();
            }
        })
    }
  }
  startFetch = () => {
    if (!this.state.text) {
      $.ajax({
        url: this.prepareLink(this.props.link),
        context: document.body
      }).done(this.showData);
    }
  };
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
  isInViewport(offset = 0) {
    if (!this.pageText) return false;
    const top = this.pageText.getBoundingClientRect().top;
    return top + offset >= 0 && top - offset <= window.innerHeight;
  }
  render() {
      console.log('rendering pagetext')
    if (this.state.text && this.state.text !== "no-content") {
      return (
        <div
          ref={el => (this.pageText = el)}
          id="pagecontent"
          className="break-words p-2"
          style={{ lineHeight: "2" }}>
          {this.state.text}
          <a href={this.props.link}>
            <span> ...Read More</span>
          </a>
        </div>
      );
    } else if (this.state.text === "no-content") {
      return false;
    }
    return <div ref={el => (this.pageText = el)} >...</div>;
  }
}

export default PageText;
