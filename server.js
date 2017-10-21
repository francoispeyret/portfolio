var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log('Serveur se lance...');

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

var connected = [];

setInterval(function(){
    console.log(connected);
},1000);

function newConnection(socket) {
    connected.push(socket.id);
    console.log('new connection: ' + socket.id);
    socket.broadcast.emit('new', socket.id);
    socket.broadcast.emit('others', connected);
    socket.on('mouse', mouseMessage);
    socket.on('click', mouseClick);

    function mouseMessage(data) {
        data.id = socket.id;
        socket.broadcast.emit('mouse', data);
    }

    function mouseClick(data) {
        data.id = socket.id;
        socket.broadcast.emit('click', data);
        console.log(socket.id + ' a CLICKER !');
    }

    socket.on('disconnect', function () {
        socket.broadcast.emit('disconnected', socket.id);
        console.log('disconnect: ' + socket.id);
        for (var i = connected.length-1; i >= 0; i--) {
            if(connected[i]==socket.id) {
                connected.splice(i,1);
            }
        }
    });
}
