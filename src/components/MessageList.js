import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: '',
      content: '',
      sentAt: '',
      roomId: ''
    };
    this.messagesRef = this.props.firebase.database().ref('Messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  };
componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
  });
}
handleChange(e) {
  e.preventDefault();
  this.setState({
    username: this.props.currentUser.displayName,
    content: e.target.value,
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoom.key
  });
}
createMessage(e){
  e.preventDefault();
  this.messagesRef.push({
    username: this.state.username,
    content: this.state.content,
    sentAt: this.state.sentAt,
    roomId: this.state.roomId
  });
  this.setState({ username: '', content: '', sentAt: '', roomId: ''});
}
render() {
  return (
    <section className = "message-list">
      {
        this.state.messages.map((message,index) => {
           if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
              return <li key={index}>{message.username}:{message.content} <Moment format="YYYY/MM/DD HH:MM:SS">{message.sentAt}</Moment></li>
           } else {
             return null
           }
       })
      }
      <form onSubmit={this.createMessage} >
        <input type="text" value={this.state.content} onChange={this.handleChange}/>
        <input type="submit" value="submit"/>
      </form>
    </section>
  );
}
}
export default MessageList;
