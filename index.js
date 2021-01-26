const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    console.log('We have a new connection');

    socket.on('disconnect', () => {
        console.log('User keluar');
    })
})



server.listen(PORT, () => console.log(`Server mulai dengan port ${PORT}`));