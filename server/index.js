const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require("cors")
const PORT = 7000

app.use(cors())
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000","http://localhost:3001"],
        methods:['GET',"POST"]
    }
})

io.on('connection',(socket)=>{
    console.log(socket.id,"==socket on");
    socket.on('message',(data)=>{
        console.log(data);
        socket.broadcast.emit('receive',data)
    })
})

server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})