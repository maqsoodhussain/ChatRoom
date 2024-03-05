const express = require('express');

const path = require('path');
const { Socket } = require('socket.io');
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, ()=> console.log(`Server On PORT ${PORT}`));
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

let socketsConnected = new Set();

io.on('connection',onConnected);



function onConnected(socket){
    console.log(socket.id)
    socketsConnected.add(socket.id);
   io.emit('total-user', socketsConnected.size);

    socket.on('disconnect', ()=>{
        console.log(`socket discnnected `, socket.id);
        socketsConnected.delete(socket.id);
        io.emit('total-user', socketsConnected.size);
    });

    socket.on('msg',(data)=>{
        console.log(data);
        socket.broadcast.emit('chat-msg', data)
    })
}

