import React, { Component } from "react";
import {Link} from 'react-router-dom';
class ChatButton extends Component {
  state = {};
  render() {
    return (
      <Link to="/chat/all uniboard/uniboard">
        <button
          title="All Uniboard Chat"
          className="inline-flex h-8 mt-2  ml-2 bg-transparent hover:bg-purple-400 text-purple-600 font-semibold hover:text-white  border border-purple-400 px-3 hover:border-transparent rounded text-3xl">
          <i class="far fa-comment-dots text-xl"></i>
        </button>
      </Link>
    );
  }
}

export default ChatButton;