const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require(`socket.io`);

const messageRoute = require('./Routes/messageRoute')
const userRoute = require('./Routes/userRoute')
const postRoute = require('./Routes/postRoute')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/messages', messageRoute)
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err.message);
    });

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: process.env.ORIGIN,
        credentials: true,
    },
});

global.onlineUsers = new Map();

global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {

        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.Message);
            console.log(data.Message);
        }
    });
});