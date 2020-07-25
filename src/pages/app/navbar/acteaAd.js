import React, { Component } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
class ActeaAd extends Component {
  state = {};
  acteaAdClick = () => {
    swal({
      title: "Try Actea!",
      text: `Actea is a new startup created by Ishaan and Deep (the creator of UniBoard). 

      At university, we are surrounded by a plethora of unique talent, whether that be across multiple academic disciplines or skills mastered beyond our chosen degrees.

      Students are able to both freelance out their own skills, as well as hire other students with skills. In addition to this, those wishing to fulfil their entrepreneurial cravings or work on projects to gain valuable experience are now able either find ongoing projects, or the necessary skills to bring their ideas to life.
      `,
      icon: 'https://actea.io/img/logo/logo.svg',
      buttons:  [":(", "Yes, I want to try it!"],
    }).then(goToActea => {
      if(goToActea) window.open('https://actea.io/', '_blank').focus();
    });
  }
  render() {
    return (
      <div className="cursor-pointer" onClick={this.acteaAdClick}>
        <button
          title="Calendar"
          className="flex h-8 mt-2 ml-3 bg-transparent hover:bg-red-400 text-red-600 font-semibold hover:text-white  border border-red-400 px-3 hover:border-transparent rounded text-3xl items-center"
        >
          <i className="fas fa-rocket text-xl self-center"></i>
          <div className="leading-none ml-2 self-center text-sm hidden xl:block">
            Interested in Startups? <span className="text-sm"></span>
          </div>
        </button>
      </div>
    );
  }
}

export default ActeaAd;
