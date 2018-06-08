// import installed moduled
const path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

// installed local modules
const {generateMessage,generateLocationMessage} = require('./utils/message');

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
io.on('connection', (socket) => {
    console.log('new User is connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin', 'New User Added'));

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('acknowledged');
    });

    socket.on('createLocation', (data) => {
        io.emit('newLocation',generateLocationMessage('Admin',data));
    })

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    })


})

// Firing up the serer
server.listen(port, () => {
    console.log(`Server is up ${port} port`);
})