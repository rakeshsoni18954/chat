// // $(function () {
var socket = io();
var iosocket = io.connect();
/*show message on connect of chat*/
iosocket.on('connect', function () {
    // $('#messages').append($('<li>Connected</li>'));
    // iosocket.on('message', function (message) {
    //     $('#messages').append($('<li></li>').text(message));
    // });
    // iosocket.on('disconnect', function () {
    //     $('#messages').append('<li>Disconnected</li>');
    // });
});

// broadcast
socket.on('broadcast', function (data) { $('#messages').append($('<li>fadlo</li>')); });

// socket.on('testerEvent', function(data){document.write(data.description)});
$('form').submit(function () {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function (msg) {
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
});
// });