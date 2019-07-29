import React, { Component } from 'react';
import Attachment from './attachment';

class Attachments extends Component {

    state = {}
    
    render() { 
        return (
            <React.Fragment>
                <div className="my-5 inline-flex text-lg w-full">
                    <i className={this.props.icon}></i>
                    <div className="px-3 font-bold">{this.props.heading}</div>
                    <div className="w-full text-right">{this.props.attachments.length}</div>
                </div>
                {this.props.attachments.map((attachment, i) =>{
                    return <Attachment key={i} resource={attachment}/>
                })}
            </React.Fragment>
        );
    }
}
 
export default Attachments;