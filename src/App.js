import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import EditableLabel from 'react-inline-editing';

var config = {
    apiKey: "AIzaSyCnmwUQ26TDyyid1pmD0bnXTvRJF2hZOgw",
    authDomain: "bloc-chat-99b69.firebaseapp.com",
    databaseURL: "https://bloc-chat-99b69.firebaseio.com",
    projectId: "bloc-chat-99b69",
    storageBucket: "bloc-chat-99b69.appspot.com",
    messagingSenderId: "676230122416"
  };
firebase.initializeApp(config);
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
      user:''
    };
    this.changeActiveRoom = this.changeActiveRoom.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  changeActiveRoom(room){
    this.setState({ activeRoom: room });
  }
  setUser(user){
    this.setState({ user: user });
  }

  handleFocus(text) {
        console.log('Focused with text: ' + text);
    }

    handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
    }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
         <div className="container">
          <div className="room-list">
           <h3>you are in: {this.state.activeRoom.name || "select a room"}</h3>

           <EditableLabel text={this.state.activeRoom.name || "select a room"}
                           labelClassName='myLabelClass'
                           inputClassName='myInputClass'
                           inputWidth='200px'
                           inputHeight='25px'
                           labelFontWeight='bold'
                           inputFontWeight='bold'
                           onFocus={this.handleFocus}
                           onFocusOut={this.handleFocusOut}
                       />

            <ul>
              <RoomList firebase={firebase}
            activeRoom = {this.state.activeRoom }
            changeActiveRoom = {( room ) => {this.changeActiveRoom(room) }} />
            </ul>
          </div>
          <div className="message-list">
          <ul>
          <MessageList firebase={firebase}
                      activeRoom={this.state.activeRoom}
                      currentUser={ this.state.user }
          />
          <User
                firebase={ firebase }
                setUser={ this.setUser }
                currentUser={ this.state.user }
          />
         </ul>
      </div>
     </div>
    </div>
    );
  }
}

export default App;
