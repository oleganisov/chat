var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

const connectedUsers = [];

io.on('connection', socket => {
    socket.on('connectUser', data => {
        let { userNick, userName, userAvatar } = data;
        let newUser = { userId: socket.id, userNick, userName, userAvatar };

        // data.userId = socket.id;
        connectedUsers.push(newUser);

        io.emit('connectUser', connectedUsers);
        console.log('connectUsers', connectedUsers);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
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
