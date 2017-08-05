var express = require('express');
var app = express();
var socket = require('socket.io');

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('listening on *:' + port);
});
app.use(express.static('public'))

let joinUser = 0
// socket setup
var io = socket(server);
io.on('connection', function (socket) {
  joinUser++;
  console.log('connected ' + joinUser);
  // on broadcast message
  socket.emit('broadcast', { description: 'clients connected!' });

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });

  socket.on('typing', function (socket) {

    console.log('typing ', socket);

  });

  /**disconnect of User */
  // socket.on('disconnect', function (msg) {
  //   if (joinUser) {
  //     joinUser--;
  //     console.log('disconnect ' + joinUser);
  //   }
  // });
});

app.get('/broadcast', function (req, res) {
  res.sendFile(__dirname + '/html/broadcast.html');
});

app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/html/chat.html');
});


