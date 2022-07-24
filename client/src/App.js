import './App.css';
import io from 'socket.io-client';
import {useState} from 'react';
import Chat from './components/Chat';
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  

  const connectToRoom = () => {
    if(username.trim() !== "" && room.trim() !== "") {
        socket.emit("connectToRoom", room);
        setShowChat(true);
    }
  }

  return (
    <div className="App">
      { !showChat ? (
        <div>
            <input type="text" placeholder="Name" onChange={(event) => {setUsername(event.target.value)}} />
            <input type="text" placeholder="Raum id" onChange={(event) => {setRoom(event.target.value)}}/>
            <button onClick={connectToRoom}>Verbinden</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} setShowChat={setShowChat} />
      )}
    </div>
  );
}

export default App;
