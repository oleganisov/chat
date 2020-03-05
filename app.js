var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

const connectedUsers = [];

io.on('connection', socket => {
    socket.on('connectUser', () => {
        socket.emit('registerInfo', { userId: socket.id });
        console.log('connectUser: ' + socket.id);
    });

    socket.on('registerInfo', data => {
        let { userId, userNick, userName } = data;
        let newUser = { userId: userId, userNick, userName };

        connectedUsers.push(newUser);
        io.emit('connectUser', connectedUsers);
    });

    socket.on('changeAvatar', data => {
        let { userId, userNick, userName, userAvatar } = data;
        let user = { userId: userId, userNick, userName, userAvatar };

        let userIndex = connectedUsers.findIndex(item => item.userId == userId);

        connectedUsers.splice(userIndex, 1, user);
        io.emit('changeAvatar', connectedUsers);
        console.log('changeAvatar: ' + socket.id, userId);
    });

    socket.on('disconnect', () => {
        let userIndex = connectedUsers.findIndex(
            item => item.userId == socket.id
        );

        connectedUsers.splice(userIndex, 1);
        io.emit('userDisconnect', connectedUsers);

        console.log('userDisconnect: ' + socket.id);
    });

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
        console.log('chat message: ' + msg);
    });
});

http.listen(3000, function() {
    console.log('listening on *: 3000');
});
