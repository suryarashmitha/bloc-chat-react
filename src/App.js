import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
