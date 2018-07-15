import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      activeRoom: {name: "select a room"},
      user:'',
      editing: false
    };
    this.changeActiveRoom = this.changeActiveRoom.bind(this);
    this.saveRoomName = this.saveRoomName.bind(this);
    this.editName = this.editName.bind(this);
    this.setUser = this.setUser.bind(this);

    this.allProps = this.props;
  }

  changeActiveRoom(room){
    this.setState({ activeRoom: room });
  }
  setUser(user){
    this.setState({ user: user });
  }

  saveRoomName(text) {
    var val = this.refs.newText.value;
    firebase.database().ref("rooms/"+this.state.activeRoom.key).update({ name: val });
    let savedRoom = this.state.activeRoom;
    savedRoom.name = val;
    this.setState({
      activeRoom: savedRoom,
      editing: false
    })
  }

  editName(text) {
    this.setState({
     editing: true
   })
  }

  render() {
    let form;
    if (this.state.editing) {
      form = <div>
         <input type="text" ref="newText" defaultValue={this.state.activeRoom.name}/>
         <button onClick={this.saveRoomName}>Save</button>
     </div>;
    } else {
        form = <div>
        <h3>you are in: {this.state.activeRoom.name}</h3>
        <button onClick={this.editName}>Edit Room</button>
      </div>;
    }
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
         <div className="container">
          <div className="room-list">
           {form}
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
