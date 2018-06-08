var socket = io();

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });
  
    jQuery('#messages').append(html);
  });
  
  socket.on('newLocation', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime
    });
  
    jQuery('#messages').append(html);
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