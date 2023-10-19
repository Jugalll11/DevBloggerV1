"use client"

import Contacts from "./Contacts";
import './Chat.css';
import BlankContainer from "./BlankContainer";
import ChatContainer from "./ChatContainer";
import { useState } from "react";
import { useRef } from "react";
import { useSession } from 'next-auth/react'


export default function Chat({contacts}) {
    const session = useSession();
    const socket = useRef();
    const [currentchat, setCurrentChat] = useState(undefined);
    const handleChatChange = (contact) => {
        setCurrentChat(undefined);
        console.log(currentchat,contact)
        setCurrentChat(contact);
    };

    
    return (<div className="ChatContainer">
        <div className="container">
            <Contacts session={session} changeChat={handleChatChange} contacts={contacts} />
            {currentchat === undefined ? (
                <BlankContainer />
            ) : (
                <ChatContainer session={session} currentchat={currentchat}
                socket={socket} />
            )}

        </div>

    </div>);
}
