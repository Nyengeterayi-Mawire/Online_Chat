require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const {createServer} = require('http');
const {Server} = require('socket.io');
const cors = require('cors')

const userRoutes = require('./routes/users');
const conversationRoutes = require('./routes/conversations');
const messageRoutes = require('./routes/messages');

const app = express();  
const server = createServer(app);
const io = new Server(server,{
    cors : {
        origin : 'http://localhost:5173'
    }
});
app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));

app.use('/users',userRoutes);
app.use('/conversations',conversationRoutes);
app.use('/messages',messageRoutes);

let users=[];

app.get('/',(req,res)=>{
    res.status(200).json(users);
})

io.on('connection',(socket)=>{
    console.log('New user connected',socket.handshake.query);
    users.push({socketID : socket.id,userID:socket.handshake.query.userID, username:socket.handshake.query.username});
    
    io.emit('newLogin',{socketID : socket.id,userID:socket.handshake.query.userID, username:socket.handshake.query.username});


    // socket.on('login',()=>{
    //     socket.emit('New login');
    // })
    socket.on('sendMessage',({socketID,message,sender})=>{
        console.log(message)
        socket.to(socketID).emit('receiveMessage',{message,sender});
    })
    socket.on('disconnect',()=>{
        users = users.filter(user=>user.socketID !== socket.id)
        console.log('user has disconnected')
        console.log(users)
    })
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`listening on port ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log(error)
}) 



