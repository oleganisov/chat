var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

const connectedUsers = [];

io.on('connection', socket => {
    socket.on('connectUser', data => {
        let { userNick, userName } = data;
        let newUser = { userId: socket.id, userNick, userName };

        connectedUsers.push(newUser);

        io.emit('connectUser', connectedUsers);
        console.log('connectUsers', connectedUsers);
    });

    socket.on('changeAvatar', data => {
        let { userNick, userName, userAvatar } = data;
        let user = { userId: socket.id, userNick, userName, userAvatar };

        let userIndex = connectedUsers.findIndex(
            item => item.userNick == userNick
        );

        connectedUsers.splice(userIndex, 1, user);
        io.emit('changeAvatar', connectedUsers);
        console.log('user change avatar');
    });

    socket.on('disconnect', data => {
        let userIndex = connectedUsers.findIndex(
            item => item.userId == socket.id
        );

        connectedUsers.splice(userIndex, 1);
        io.emit('userDisconnect', connectedUsers);

        console.log(socket.id, 'user disconnected');
    });

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });

    console.log('A user connected', socket.id);
});

http.listen(3000, function() {
    console.log('listening on *: 3000');
});
