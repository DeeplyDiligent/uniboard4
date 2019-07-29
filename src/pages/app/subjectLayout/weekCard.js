import React, { Component } from "react";
import { database } from "firebase";
import WeekSlider from "./weekSlider/weekSlider";
import { Link } from "react-router-dom";
class WeekCard extends Component {
  state = { children: [] };
  componentDidMount() {
    if (this.props.data && this.props.data.children) {
      this.setState({
        children: this.props.data.children.filter(elem => elem !== "")
      });
    }
  }

  render() {
    return (
      <Link to={`/sidebar/${this.props.unitId}/${this.props.branchId}`}>
        <div
          style={{ width: "100%", transition: "all 0.1s ease-in-out" }}
          className="border-2 rounded border-light-gray p-4 my-2 hover:shadow-md weekcard cursor-pointer ">
          <div className="flex justify-between">
            <div className="w-full">
              <div
                className="brow mb-3"
                style={{ backgroundColor: this.props.color }}
              />
              <div className="flex flex-wrap">
                <div className="text-gray-800 font-light text-lg mb-1">
                  {this.props.weekName}
                </div>
                <div
                  style={{
                    width: "fit-content",
                    marginLeft: "auto",
                    marginRight: "0px"
                  }}
                  className="text-sm font-thin text-gray-600 pl-2 mt-1">
                  Files: {this.state.children.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default WeekCard;
