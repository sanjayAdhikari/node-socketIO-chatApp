// import installed moduled
const path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

// installed local modules
const {generateMessage} = require('./utils/message');

// define constant
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

// create an application and boost up the app
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// use the middleware
app.use(express.static(publicPath));

// implementing socketIO
io.on('connection',(socket) => {
    console.log('new User is connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome the the chat App'));

    socket.broadcast.emit('newMessage',"New User Joined!");

    socket.on('createMessage', (data) => {
       io.emit('newMessage',generateMessage(data.from, data.text));

    //    socket.broadcast.emit('newMessage', {
    //     from: data.from,
    //     text: data.text,
    //     createAt: new Date().getTime()
    //    });

    })

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    })


})

// Firing up the serer
server.listen(port, () => {
    console.log(`Server is up ${port} port`);
})