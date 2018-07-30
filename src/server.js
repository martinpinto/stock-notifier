const express = require('express');
const http = require('http');
let io = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

io = io.listen(server);
io.set('origins', '*:*');

app.set('startTime', new Date());

app.get('/', (req, res) => {
    res.json({
        "started": app.get('startTime')
    });
});

io.sockets.on('connection', (socket) => {
    socket.on('ticker', (ticker) => {
        trackTicker(socket, ticker);
    });
});

server.listen(process.env.PORT || 4000);