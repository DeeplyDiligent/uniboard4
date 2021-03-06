import React, { Component } from "react";
import PerfectScrollbar from "react-custom-scrollbars";
import moment from 'moment';
import database from "../../../../data/main";

class Message extends Component {
  state = {}
  render() {
    let name = this.props.name || "Anon@Anon"
    return (
      <div className={`mt-4 flex flex-col ${this.props.email===this.props.name?"items-end":"items-start"}`}>
        <div className="text-grey-900 inline-block text-sm">
          {name.split("@")[0]||"Anon"} | {moment(this.props.time.toDate()).format('LT')}
        </div>
        <p className={`rounded-sm py-3 px-2 ${this.props.email===this.props.name?"bg-blue-300":"bg-blue-200"} mt-1`}>
          {this.props.message}
        </p>
      </div>
    );
  }
}

class ChatPage extends Component {
  state = { messages: [], userEmail: null, error: false};
  scrollObj = React.createRef();
  listener = null
  
  componentDidMount() {
    this.updateSubjectMessages()
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    if(prevProps.subject.id !== this.props.subject.id) {
      console.log('dispose')
      if(this.listener) this.listener()
      this.updateSubjectMessages()
    }
  }
  
  updateSubjectMessages(){
    database.setLastActiveTime(this.props.subject.id)
    this.listener = database.listenForChats(this.props.subject.id, this.newMessage);
    database.getEmail((email, err)=>this.setState(err?{error:true}:{userEmail: email}))
  }
  
  newMessage = messages => {
    database.setLastActiveTime(this.props.subject.id)
    messages = messages.sort(function(a, b) {
      return a.time - b.time;
    });
    this.setState({ messages: messages }, () => {
      if(this.scrollObj.current) this.scrollObj.current.scrollToBottom();
    });
  };
  _handleKeyPress = event => {
    if (event.key === "Enter") {
      this.sendMessage(event.target.value);
      event.target.value = "";
    }
  };
  sendMessage = message => {
    if (message.trim()){
      database.sendMessage(
        this.props.subject.id,
        message,
        this.state.userEmail
      );
    }
  };
  sendButton = () => {
    this.sendMessage(this.messageInput.value);
    this.messageInput.value = ''
  }
  componentWillUnmount() {
    console.log('dispose')
    if(this.listener) this.listener()
  }
  render() {
    if(this.state.error) return  <div>Please refresh your browser, you have been logged out!</div>
    if(!this.state.userEmail) return  <i className={"fas fa-sync-alt text-center px-1 rotate-center" }/>
    return (
      <div className="w-full mx-auto flex flex-grow items-center justify-center">
        <div className="bg-white text-black font-sans leading-normal w-full flex flex-col h-full">
          <header className="bg-blue-700 text-white py-4 flex items-center justify-between">
            <div
              className="inline-flex items-center pl-4 cursor-pointer"
            >
              {/* <span className="uppercase font-semibold tracking-wide text-sm">
                <i className="fa fa-chevron-left" /> Back
              </span> */}
            </div>
            <div className="inline-flex items-center">
              <span className="uppercase font-semibold tracking-wide text-sm">
                {this.props.subject.label} Chat
              </span>
            </div>
            <div className="inline-flex items-center" />
          </header>

          <div className="container m-auto pb-4 px-3 flex-grow">
            {/* <div className="relative flex items-center justify-center">
              <hr className="bg-grey-light h-px absolute pin" />
              <span className="bg-white uppercase text-grey-dark inline-block px-2 py-1 text-xs z-10 leading-none">
                Today
              </span>
            </div> */}
            <PerfectScrollbar ref={this.scrollObj}>
              <div className="py-2">
                {this.state.messages.map((message, y) => {
                  return (
                    <Message
                      message={message.message}
                      email={this.state.userEmail}
                      name={message.userEmail}
                      time={message.time}
                      key={y}
                    />
                  );
                })}
              </div>
            </PerfectScrollbar>
          </div>
          <div className="container m-auto items-center">
            <hr className="m-auto bg-gray-300 h-px" />
            <div className="flex">
              <input
                ref={(messageInput) => { this.messageInput = messageInput }}
                onKeyPress={this._handleKeyPress}
                className="inline-block resize-none flex-auto ml-4 py-3 outline-none leading-none h-10 text-grey-darkest"
                placeholder="Enter your message"
              />
              <button onClick={this.sendButton} className="font-bold tracking-wide uppercase text-blue px-4 py-3 hover:text-blue-light">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPage;
