import React from 'react'
import "./Message.css"

function Message({message, timestamp, user, userImage, translation}) {
    return(
        <div className="message">
            <img src={userImage} alt=""/>
            <div className="message_info">
            <h4>
                {user} 
                <span className="message_timestamp">
                    {new Date(timestamp?.toDate()).toUTCString()}
                </span>
            </h4>
            <p>{message}</p>
            <pre>
                <code>{translation}</code>
            </pre>
            </div>
        </div>
    )
}

export default Message