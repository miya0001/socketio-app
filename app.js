// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));
io.sockets.setMaxListeners(0);

var port = process.env.PORT || 3000;
server.listen(port);

var get_room = function(socket) {
  return socket.request._query.app;
}

// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
  var room = get_room(socket);
  if (room) {
    socket.join(room);
    io.to(room).emit('join', room);
    socket.on('push', function (data) {
      io.to(room).emit('push', data);
    });
  } else {
    io.sockets.sockets[socket.id].disconnect();
  }
});
