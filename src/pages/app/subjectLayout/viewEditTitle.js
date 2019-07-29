import React, { Component } from "react";
import EditableLabel from "react-inline-editing";
import { Textfit } from "react-textfit";
import database from "../../../data/main";
/*global chrome*/

class ViewEditTitle extends Component {
  state = {
    unitTitle: this.getUnitTitle(),
    editKey: new Date().getTime(),
    showPencil: 'none'
  };
  getUnitTitle() {
    let databaseUnitTitle = database.getSubjectName(this.props.unitId);
    if (!databaseUnitTitle) {
      databaseUnitTitle = this.props.unitName;
    }
    return databaseUnitTitle;
  }
  _handleFocusOut = text => {
    if (text) {
      database.setSubjectName(this.props.unitId, text);
      this.setState({ unitTitle: text, editKey: new Date().getTime() });
    } else {
      database.setSubjectName(this.props.unitId, this.props.unitName);
      this.setState({ unitTitle: this.props.unitName, editKey: new Date().getTime() });
    }
  };
  componentDidMount() {}
  render() {
    this.divClass =
      "text-lg block bg-transparent hover:bg-gray-300 rounded-lg flex overflow-hidden";
    this.labelClass = "cursor-pointer block mx-2 overflow-hidden whitespace-no-wrap";
    return (
      <div onMouseEnter={()=>this.setState({showPencil:'block'})} onMouseOut={()=>this.setState({showPencil:'none'})} className="flex">
        <div className={this.divClass}>
          <EditableLabel
            className="overflow-hidden"
            key={this.state.editKey}
            text={this.state.unitTitle}
            labelClassName={this.labelClass}
            inputWidth="100%"
            inputMaxLength={50}
            labelFontWeight="bold"
            inputFontWeight="bold"
            onFocus={this._handleFocus}
            onFocusOut={this._handleFocusOut}
          />
        </div>
        <i style={{display:this.state.showPencil}} className="fas fa-pencil-alt mt-1 ml-2 text-purple-400" />
      </div>
    );
  }
}

export default ViewEditTitle;
