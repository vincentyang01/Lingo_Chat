import React, {useState, useEffect, useRef} from 'react';
import './Chat.css'
import { useParams } from "react-router-dom"
import db from './firebase.js'
import Message from "./Message"
import ChatInput from "./ChatInput"


function Chat(props) {
    // let objDiv
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null)
    const [roomMessages, setRoomMessages] = useState([])

    useEffect(() => {
        if(roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => (setRoomDetails(snapshot.data())))
        }
        db.collection("rooms")
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => setRoomMessages(snapshot.docs.map((doc) => doc.data())))
    }, [roomId]);

    const me = props.user.displayName

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [roomMessages]);



    return (
        <div className="chat" id="messageWindow">
            <div className="chat_header">
                <div className="chat_headerLeft">
                    <h4 className="chat_channelName">
                        <strong> {roomDetails?.name}</strong>
                    </h4>
                </div>
                <div className="chat_headerRight">
                    <p>
                    </p>

                </div>
            </div>
            <div className="chat_messages">
                {roomMessages.map(({message, timestamp, user, userImage, translation, language}) => (
                    <Message 
                        message = {message}
                        timestamp = {timestamp}
                        user={user}
                        userImage={userImage}
                        translation={translation}
                        me={me}
                        language={language}
                        />
                        ))
                }
            </div>
            <ChatInput channelName={roomDetails?.name} channelId={roomId} language={props.sendLanguage} />
            <div ref={messagesEndRef}></div>
        </div>
            
    )
}

export default Chat