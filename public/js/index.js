var socket = io();

socket.on('newMessage', function (data) {
    var formattedTime = moment(data.createdAt);
    var li = jQuery('<li></li>');
    li.text(`${data.from} ${formattedTime.format('h:mm a')}: ${data.text}`);
    jQuery('#messages').append(li);
})

socket.on('newLocation', function (message) {
    var formattedTime = moment(message.createdAt);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank"> Get location </a>');

    li.text(`${message.from} ${formattedTime.format('h:mm a')}: `)
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);

});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });

});

var sendLocation = jQuery('#send-location');
sendLocation.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    sendLocation.attr('disabled','disabled').text('Sending location');
    navigator.geolocation.getCurrentPosition(function(posistion){
        sendLocation.removeAttr('disabled').text('Send location');
        socket.emit('createLocation',{
            latitude: posistion.coords.latitude,
            longitude: posistion.coords.longitude
        })
    }, function(){
        sendLocation.removeAttr('disabled').text('Send location');
        alert('Unable to fetch the location');
    })
})

var clearLog = jQuery('#clear-log');
clearLog.on('click', function(){
    $('ol').html('');

})