var socket = io();
// Create connect event. This will connect to the server
// Avoid using arrow functions as they might not 
socket.on('connect', function (){
    console.log('connected to server');
    /*socket.emit('createEmail', {
        to: 'sunita.pathak@gmail.com',
        text: 'Created email by client'
    });*/

    socket.emit('createMessage', {
        to: 'Sunita123',
        text: 'Hello there'
    });
});

socket.on('disconnect', function() {
    console.log('disconnected fron server');
});

// Getting the server event data
// socket.on('newEmail', function(email){
//     console.log('new Email', email);
// });

// Subscribe and receive for any new chats events from the server
socket.on('newMessage', function(chatMessage){
    console.log('Received new chat:', chatMessage);
});
