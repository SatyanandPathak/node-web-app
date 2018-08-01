const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 4000;


var app = express();
var server = http.createServer(app);

// The below server io can listen and emit events
// In the socket io, both server and client keeps the connection as long as they want it
// If server is down, then client keeps trying to poll for the server event and will fail
// Once the server is up, the calls then succeeds
var io = socketIO(server);

// Create a connection event. This will have access to socket
io.on('connection', (socket) => {
    console.log('new user connected');
    // Listen to disconnect event from client/user
    socket.on('disconnect', () => {
        console.log('user/client was disconnected');
    })
});



// Middleware to configure rendering public folder contents
app.use(express.static(publicPath));

app.get('/', (request, response)=> {
    response.render('index.html');
    //response.send('hello')
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
