const path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const port = process.env.PORT || 3000;

var publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('new User is connected');

    socket.on('createMessage', (data) => {
        console.log('create Message:',data);
       io.emit('newMessage', {
           from: data.from,
           text: data.text,
           createAt: new Date().getTime()
       })
    })

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    })


})
server.listen(port, () => {
    console.log(`Server is up ${port} port`);
})