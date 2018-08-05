var socket = io();
// Create connect event. This will connect to the server
// Avoid using arrow functions as they might not 
socket.on('connect', function (){
    console.log('connected to server');
});


// Subscribe and receive for any new chats events from the server
socket.on('newMessage', function(chatMessage){
    var formattedTime = moment(chatMessage.createdAt).format('h:mm a');
    console.log('Client Received a new chat from Server, Listening to newMessage event:', chatMessage);
    var li = jQuery('<li></li>');
    li.text(`${chatMessage.from} ${formattedTime}: ${chatMessage.text}`);
    jQuery('#messages_list').append(li);
});

socket.on('disconnect', function() {
    console.log('disconnected fron server');
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages_list').append(li);
})

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
        var messageTextBox = $("#message");
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()
        }, function() {
            messageTextBox.val('');
        });
        
    });

    var locationButton = $('#sendLocation');
    locationButton.click(function() {
        if(!navigator.geolocation){
            return alert('Geolocation not supported by your browser');
        }
        // Disable the button while it is in progress
        locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function(position){

            // Success case
            locationButton.removeAttr('disabled').text('Send Location');
            socket.emit("createLocationMessage", {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude

            });
        }, function(position) {
            return alert('Unable to fetch location');
            locationButton.removeAttr('disabled').text('Send Location');
        });
    });

});