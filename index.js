var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(8000, function(){
    console.log("Listening to port 8000");
});

//Static files
app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket){
    console.log("Socket connection made", socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
        //sockets refers to all sockets
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
})
 
