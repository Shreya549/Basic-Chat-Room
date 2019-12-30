//Make connection
var socket = io.connect("http://localhost:8000");

//query DOM
var output = document.getElementById("output");
var handle = document.getElementById("handle");
var message = document.getElementById("message");
var send = document.getElementById("send");
var btn = document.getElementById("send");
var feedback = document.getElementById("feedback");


//emit events
btn.addEventListener('click', function(){
    socket.emit('chat',{
        message: message.value,
        handle:handle.value 
    });
    handle.innerHTML = "";
    message.innerHTML = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

//Listen for events
socket.on('chat', function(data){
    console.log("Output received");
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing.. </em></p>';
});

