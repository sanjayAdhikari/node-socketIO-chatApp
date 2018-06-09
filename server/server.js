// import installed moduled
const path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');

// installed local modules
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {User} = require('./utils/users');

// define constant
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var Users = new User();

// create an application and boost up the app
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// use the middleware
app.use(express.static(publicPath));

// implementing socketIO
io.on('connection', (socket) => {
    console.log('new User is connected');

    

    socket.on('join', (params,callback)=> {
         if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room name are required')             
         }
         var name = params.name;
         var room = params.room;

         socket.join(room); //join the room
         Users.removeUser(socket.id); //remove the user if previous 
         Users.addUser(socket.id, name, room); //save the user data

        io.to(room).emit('updateUserList', Users.getUserList(room));

         //socket.leave('The office Fans');
        // io.emit-> io.to.emit('room)
        // socket.broadcast.emit -> socket.broadcast.to.emit

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));
        socket.broadcast.emit('newMessage',generateMessage('Admin', `${name} joined the chat.`));
    });

    socket.on('createMessage', (message, callback) => {
        var user = Users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        // socket.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocation', (data) => {
        var user = Users.getUser(socket.id);
        io.to(user.room).emit('newLocation',generateLocationMessage(user.name,data));
    })

    socket.on('disconnect', () => {
        var user = Users.removeUser(socket.id); //remove the user if previous 

        if (user) {
            socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left the room.`));
            io.to(user.room).emit('updateUserList', Users.getUserList(user.room));
        }

    })


})

// Firing up the serer
server.listen(port, () => {
    console.log(`Server is up ${port} port`);
})