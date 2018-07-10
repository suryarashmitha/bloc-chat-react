import React, { Component } from 'react';

class RoomList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
   }

   componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       var obj = {};
       obj.room = snapshot.val();
       obj.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( obj.room ) });
     });
   }

    render(){
      return(

        <section className='room-list'>
        <ul>
          {
         this.state.rooms.map( (room, index) =>
           <li key={index} >
              {room.name}
           </li>
         )
       }
       </ul>
      </section>
      );
  }
}

export default RoomList;
