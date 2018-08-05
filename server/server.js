const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');

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

    // Send message from Admin text when someone joins
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // Broadcast that event to others saying new user has joined 
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

    // socket.emit emits and event to a single connection
    // Listen to the client createMessage event and publish
    // it to all the connections using io.emit

    /**
     * Listen to createMessage event from the client. If some client send a new Message
     * Use socket.on to listen to a specific event from a client connection
     * Use io.emit to emit an event to all the client subscribers
     * 
     */
    // Listen createMessage event from client connections
    socket.on('createMessage', (message, callback) => {
        console.log('Server: Received a new message:', message);
        // Emit the message to every client connection
        io.emit('newMessage', generateMessage(message.from, message.text));
        //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        // Emit to all the user connections
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })

    // Listen to disconnect event from client/user connections
    socket.on('disconnect', () => {
        console.log('user/client was disconnected');
        // Publish/Emit disconnect message to all the user connection
        io.emit('newMessage', generateMessage('Admin', 'One User disconnected'))
    });

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
