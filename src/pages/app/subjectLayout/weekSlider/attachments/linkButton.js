import React, { Component } from 'react';
class LinkButton extends Component {
    state = {  }
    render() { 
        return (
            <button onClick={this.props.onClick} title={this.props.title} className="bg-white hover:bg-purple-lightest text-purple font-bold py-1 px-3 rounded mt-3 lg:mt-0 focus:outline-none">
                {this.props.text}
            </button>
        )
    }
}
 
export default LinkButton;