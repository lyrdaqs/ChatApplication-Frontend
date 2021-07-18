import React, { useState, useEffect } from 'react';
import SidePanel from "../components/SidePanel";
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import {useSelector} from "react-redux";


const Chat = ({history, match}) =>{

    const chatID = match.params.id

    const [message, setMessage] = useState('')
    const [chatSocket, setChatSocket] = useState({})
    const [messages, setMessages] = useState([])
    const [endMessage, setEndMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(()=>{
        setMessages([])
        setChatSocket(new W3CWebSocket(
            `ws://127.0.0.1:8000/ws/chat/${chatID}/`
        ));
        scrollToBottom()
    },[chatID])


    chatSocket.onclose = (e) => {
        console.error('Chat socket closed unexpectedly');
        setChatSocket(new W3CWebSocket(
            `ws://127.0.0.1:8000/ws/chat/${chatID}/`
        ));
    };
    chatSocket.onopen = (e) => {
        console.log('Chat socket connected');
        chatSocket.send(JSON.stringify({
            'command': 'fetch_messages',
        }));
    }
    chatSocket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data)
        const newMessages = data.message.reverse()
        setMessages([...messages,...newMessages])
    }

    const sendMessage = () => {
        chatSocket.send(JSON.stringify({
            'message': message,
            'command': 'new_messages',
            'user_id': userInfo.id
        }));
        setMessage('')
        scrollToBottom()
    }

   const scrollToBottom = () => {
        if(endMessage){
            endMessage.scrollIntoView({ behavior: "smooth" });
        }
   }

    return(
        <div id="frame">
            <SidePanel history={history}/>

            <div className="content">
                <div className="contact-profile">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt=""/>
                    <p>Harvey Specter</p>
                    <div className="social-media">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="messages">
                    <ul>
                        {messages.map((m)=>(
                            <li key={m.id} className={(userInfo.id === m.author_id)? 'sent' : 'replies'}>
                                <img src="http://emilcarlsson.se/assets/mikeross.png" alt=""/>
                                <p>{m.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { setEndMessage(el);}}>
                </div>
                <div className="message-input">
                    <div className="wrap">
                        <input value={message} onChange={(e) => setMessage(e.target.value)}
                            type="text" placeholder="Write your message..."/>
                        <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                        <button onClick={()=>{sendMessage()}} className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;