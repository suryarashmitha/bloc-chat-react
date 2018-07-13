import React, {Component} from 'react';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.messagesRef = this.props.firebase.database().ref('Messages');
  };
componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
  });
}
render() {
  return (
    <section className = "message-list">
      {
        this.state.messages.map((message,index) => {
          console.log(this.props);
          console.log(message);
           if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
              return <li key={index}>{message.username}:{message.content} {message.sentAt}</li>
           } else {
             return null
           }
       })
      }
    </section>
  );
}
}
export default MessageList;
