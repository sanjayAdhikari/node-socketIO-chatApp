var socket = io();
socket.on('connect', () => {
    console.log('server is connected');
})

socket.on('newMessage', function(data) {
    console.log(data);
})
socket.on('disconnect', () => {
    console.log('Disconnected from server');
})

socket.on('onJoin', function(responseMessage){
    console.log(responseMessage);
})



