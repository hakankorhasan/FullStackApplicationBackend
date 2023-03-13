const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1337;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/deneme.html');
});

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', function () {
        console.log('user disconnected');
    })

    socket.on('chat message', msg => {
        console.log('message:' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});

