import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import { Server } from "socket.io";
import http from 'http';

const app=express();
const PORT=8000;
const server=http.createServer(app);
const io= new Server(server);

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

app.get('/',(req,res)=>{
    //res.send('Hello World');
    res.sendFile(path.join(__dirname+'/index.html'));
})

io.on('connection', (socket)=>{
    console.log(socket.id);
    console.log("User Connected");

    socket.on('chat message', (msg)=>{
        console.log('message:',msg);
        io.emit(msg);

    })

    socket.on('disconnected', ()=>{
        console.log('User Disconnected');
    });
})
server.listen(PORT,()=>{
    console.log("App is listening on",PORT);
})