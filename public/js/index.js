var socket = io();
// Create connect event. This will connect to the server
// Avoid using arrow functions as they might not 
socket.on('connect', function (){
    console.log('connected to server');
});


// Subscribe and receive for any new chats events from the server
socket.on('newMessage', function(chatMessage){
    console.log('Received new chat:', chatMessage);
});

socket.on('disconnect', function() {
    console.log('disconnected fron server');
});
