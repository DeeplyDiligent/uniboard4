import React, { Component } from "react";
import PerfectScrollbar from "react-custom-scrollbars";
import RenderLogo from "./renderLogo";
import download from "../../../data/download";
import ButtonsBesideSubjectName from "../../../components/reused/buttonsBesideSubjectName";
import ViewEditTitle from "./viewEditTitle";
import database from "../../../data/main";
import WeekCard from "./weekCard";
import { Link } from "react-router-dom";

class UnitBoard extends Component {
  state = {};

  nameCanBeShortened(name) {
    return database.shortenName(name) !== name;
  }
  startDownload = () => {
    download.startDownload(this.props.unitData, this.props.unitId);
  };
  showSubjectPage = () => {
    let firstlink = this.props.unitData[Object.keys(this.props.unitData)[0]]
      .link;
    let url = new URL(firstlink);
    let searchParams = new URLSearchParams(url.search);
    let subjectId = searchParams.get("id");
    window.open(url.origin + "/course/view.php?id=" + subjectId, "_blank");
  };
  render() {
    const colorList = [
      "#3e49bb",
      "mediumseagreen",
      "#c5009e",
      "#009888",
      "#682cbf",
      "#50342c",
      "#20B2AA"
    ];
    var borderColor = colorList[this.props.number];
    if (!Object.values(this.props.unitData)[0]) return false;
    return (
      <div
        style={{
          minWidth: "250px",
          overflow: "hidden",
          borderRadius: "6px",
          borderColor: borderColor
        }}
        className="flex flex-1 overflow-hidden custom-shadow m-2 mb-4 bg-white border-b-8 flex-col">
        <div className="flex px-3 py-2 bg-white border-b border-grey-light flex-no-shrink">
          <div className="flex-no-shrink relative" style={{ width: "26px" }}>
            <div
              className="absolute"
              style={{
                width: "26px",
                top: "50%",
                transform: "translateY(-50%)"
              }}>
              <RenderLogo color={borderColor} />
            </div>
          </div>
          <div className="flex flex-col flex-grow mx-1 overflow-hidden justify-center">
            <ViewEditTitle
              unitId={Object.values(this.props.unitData)[0].key}
              unitName={Object.values(this.props.unitData)[0].name}
            />
          </div>
          <div className="flex justify-center">
            <Link to={`/chat/${Object.values(this.props.unitData)[0].name}/${Object.values(this.props.unitData)[0].key}`}>
              <button
                title="Chat In This Unit"
                className="bg-white hover:bg-green-100 text-green-600 font-bold py-1 px-1 rounded focus:outline-none">
                <i className="fas fa-comment text-md" />
              </button>
            </Link>
            <ButtonsBesideSubjectName
              onClick={this.startDownload}
              title="Download All"
              text={<i className="fas fa-file-export text-md" />}
            />
            <ButtonsBesideSubjectName
              onClick={this.showSubjectPage}
              title="Open Unit"
              text={<i className="fas fa-external-link-alt text-md" />}
            />
          </div>
        </div>
        <PerfectScrollbar autoHide>
          <div className="px-4 py-2">
            {Object.values(this.props.unitData)[0].children.map((child, _) => {
              let value = this.props.unitData[child.expandable];
              if (value && !value.error) {
                return (
                  <WeekCard
                    weekName={value.name}
                    data={value}
                    unitId={Object.values(this.props.unitData)[0].key}
                    key={_}
                    branchId={child.expandable}
                    color={borderColor}
                  />
                );
              }
              return false;
            })}
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

export default UnitBoard;
