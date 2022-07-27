const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const  {Server} = require('socket.io'); 

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["POST", "GET"],
        transports: ["websocket"]
    }
});

io.on('connection', (socket) => {
    console.log('User verbunden: ' + socket.id);

    socket.on('connectToRoom', (data) => {
        socket.join(data);
        console.log("User " + socket.id + " ist Raum " + data + " beigetreten");
    });

    socket.on('disconnectRoom', (room) => {
        socket.leave(room);
    });

    socket.on("sendMessage", (messageData) => {
        socket.to(messageData.room).emit('receiveMessage', messageData);
    });

    socket.on('disconnect', () => {
        console.log("User " +socket.id+" hat die Verbindung getrennt");
    });
});

server.listen(3001, () => {
    console.log("Server gestartet");
});

