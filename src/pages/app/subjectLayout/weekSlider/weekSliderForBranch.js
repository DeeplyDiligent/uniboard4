/*global chrome*/
import React, { Component } from "react";
import Attachments from "./attachments/attachments";
import NoAttachments from "./attachments/noAttachments";
import SidebarMain from "./weekSlider";
import database from "../../../../data/main";
import ShowWeekText from "./showWeekText";

class WeekSliderForBranch extends Component {
  state = { data: null };

  render() {
    let weekData = database.getWeekData(
      this.props.match.params.unitid,
      this.props.match.params.branchid
    );
    if (weekData) {
      weekData.link = weekData.link.replace("#", "&").replace("-", "=");
      let files = weekData.children ? weekData.children : [];
      let catFiles = {};
      files = files.filter(elem => elem !== "");
      files.map(x => {
        catFiles[x.title] = catFiles[x.title] ? catFiles[x.title] : [];
        catFiles[x.title].push(x);
      });
      console.log(catFiles);
      return (
        <SidebarMain>
          <div className="text-2xl font-bold">
            {database.getSubjectName(this.props.match.params.unitid)}
          </div>
          {/* <div className="text">{this.props.match.params.id}</div> */}
          <div className="bg-red-400 brow my-4" />
          <a
            href={weekData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md text-gray-700 flex no-underline flex-col md:flex-row hover:text-gray-500">
            <div className="flex-grow py-2">{weekData.name}</div>
            <div className="py-2">
              Open Moodle <i className="fas fa-external-link-alt" />
            </div>
          </a>
          <ShowWeekText key={weekData.link} link={weekData.link} />
          <div className="mt-4">
            {/* {(weekData.files && weekData.files.length) ? <Attachments attachments={weekData.files} heading={"FILES"} icon={"fas fa-file"}/>: false} */}
            {Object.keys(catFiles).map((key, _)=>{
                let filesArray = catFiles[key];
                return <Attachments attachments={filesArray} heading={key.toUpperCase()} key={_} icon={"fas fa-file"}/>
            })}
            {files.length ? false : <NoAttachments attachments={weekData} />}
            {/* {totalFiles && typeof(chrome) !== 'undefined' ? <DownloadAttachments attachments={weekData} /> : false} */}
          </div>
        </SidebarMain>
      );
    }
    return false;
  }
}

export default WeekSliderForBranch;
