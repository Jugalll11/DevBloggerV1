'use client'
import { useEffect, useRef, useState } from "react";
import Header from "./header"
import Input from "./input"
import './Chat.css'
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function ChatContainer({ session, currentchat, socket }) {

    const host = `http://localhost:4452`;
    socket.current = io(host);
    socket.current.emit("add-user", session.data.user.id);
    const currChat = currentchat;
    console.log(session.data.user.id)

    const [incomingMessage, setIncomingMessage] = useState(null);

    const [chatMessages, setMessages] = useState([])



    async function fetchChats() {
        const messageArr = await axios.post('http://localhost:4452/api/messages/getMsg', {
            from: currentchat._id,
            to: session.data.user.id
        })

        setMessages(messageArr.data)
    }


    async function handleMessage(msg) {
        await axios.post('http://localhost:4452/api/messages/addMsg', {
            to: currentchat._id,
            from: session.data.user.id,
            message: msg,
        });
        socket.current.emit("send-msg", {
            to: currentchat._id,
            from: session.data.user.id,
            Message: msg,
        });
        const msgs = [...chatMessages];
        msgs.push({
            fromself: true,
            message: msg,
        });
        setMessages(msgs);
    }

    useEffect( () => {
        fetchChats();
    }, [currentchat]);


    useEffect(() => {
        incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
    }, [incomingMessage]);

    useEffect(() => {
        socket.current.on("msg-recieve", (msg) => {
            console.log('recieved')
            setIncomingMessage({
                fromself: false,
                message: msg,
            });
        });

    }, [chatMessages]);

    const scrollRef = useRef();


    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behaviour: "smooth",
        });
    }, [chatMessages]);
    return (
        <div className="bg-slate-600 chat-messages">
            <Header name={currentchat} />
            <div className="chatty">
                {chatMessages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`message ${message.fromself ? "sent" : "recieved"}`}
                            >
                                <div className="content">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Input handleMessage={handleMessage} />
        </div>
    )
}