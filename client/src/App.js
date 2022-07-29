import './App.css';
import io from 'socket.io-client';
import {useState} from 'react';
import Chat from './components/Chat';
const socket = io.connect("ws://localhost:3001");

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
        <div className="flex items-center justify-center h-screen"> 
            <div className="flex flex-col space-y-4  w-3/6 sm:w-3/6 md:3/6 lg:w-1/6">
                <h1 className="text-lg">IT0823 Chat</h1>
                <input className="border border-emerald-600 border-md focus:border-emerald-800 p-2" type="text" placeholder="Name" onChange={(event) => {setUsername(event.target.value)}} />
                <input className="border border-md border-emerald-600 focus:border-emerald-800 p-2" type="text" placeholder="Raum id" onChange={(event) => {setRoom(event.target.value)}}/>
                <button className="p-2 border border-md bg-emerald-600 text-white" onClick={connectToRoom}>Verbinden</button>
            </div>
        </div>
      ) : (
        //flex flex-col items-center justify-center h-screen
        <div className="flex flex-col items-center justify-center h-screen">
            <Chat socket={socket} username={username} room={room} setShowChat={setShowChat} />
        </div>
      )}
    </div>
  );
}

export default App;