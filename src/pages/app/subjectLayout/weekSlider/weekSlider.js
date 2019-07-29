import React, { Component } from "react";
import PerfectScrollbar from "react-custom-scrollbars";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import posed from "react-pose";

const Box = posed.div({
  visible: { x: 0, width:500, transition: { duration: 300 } },
  hidden: { x: 500, width:0 }
});

class WeekSlider extends Component {
  state = { isVisible: false };

  componentDidMount() {
    this.setState({ isVisible: true });
  }


  close = () => {
      this.setState({isVisible:false})
  }

  render() {
    let styles = {};
    styles.backgroundAndSidebar = { left: 0, top: 0 };
    styles.sidebar = { right: 0, zIndex: "1000" };
    return (
      <Box
        pose={this.state.isVisible ? "visible" : "hidden"}
        className="sidebarContent bg-white max-w-sm rounded shadow-lg w-full lg:w-1/3 h-full"
        style={styles.sidebar}>
        <PerfectScrollbar autoHide>
          <div className="px-8 py-4">
            <Link to="/home">
            <div onClick={this.close} className="text-right pb-2 text-3xl">
              <i className="fas fa-times" />
            </div>
            </Link>
            {this.props.children}
          </div>
        </PerfectScrollbar>
      </Box>
    );
  }
}

export default WeekSlider;
