import React, { Component } from 'react';
import logo from './logo.svg';
import * as firebase from 'firebase';
import './App.css';
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
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
