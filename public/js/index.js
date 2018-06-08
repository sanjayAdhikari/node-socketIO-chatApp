var socket = io();

socket.on('connect', () => {
    console.log('server is connected');
})

socket.on('newMessage', function (data) {
    console.log(`${data.from} says: ${data.text}`);
    var li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    jQuery('#messages').append(li);
})
socket.on('disconnect', () => {
    console.log('Disconnected from server');
})

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        
    })

})