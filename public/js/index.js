var socket = io();
// Create connect event. This will connect to the server
// Avoid using arrow functions as they might not 
socket.on('connect', function (){
    console.log('connected to server');
});


// Subscribe and receive for any new chats events from the server
socket.on('newMessage', function(chatMessage){
    console.log('Client Received a new chat from Server, Listening to newMessage event:', chatMessage);
    var li = jQuery('<li></li>');
    li.text(`${chatMessage.from}: ${chatMessage.text}`);
    jQuery('#messages_list').append(li);
});

socket.on('disconnect', function() {
    console.log('disconnected fron server');
});

// Acknowledgement using call back
// socket.emit('createMessage', {
//     from: 'Satyanand',
//     text: 'Hi there'
// }, function(data) {
//     console.log('Got it:', data);
// })




$(document).ready(function(){
    $("#sendMessage").click(function(e) {
        e.preventDefault();

        socket.emit('createMessage', {
            from: 'User',
            text: $("#message").val()
        }, function() {

        });
        
    });

    var locationButton = $('#sendLocation').click(function() {
        if(!navigator.geolocation){
            return alert('Geolocation not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition(function(position){
            // Success case
            console.log(position)
        }, function(position) {
            return alert('Unable to fetch location');
        });
    });
});