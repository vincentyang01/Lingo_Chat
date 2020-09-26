import React, { useState } from 'react';
import './ChatInput.css';
import db from "./firebase"
import { useStateValue } from "./StateProvider"
import firebase from "firebase"

const translate = (message) => {
    let uri = encodeURI(message)

    fetch("https://microsoft-azure-translation-v1.p.rapidapi.com/translate?from=en&to=es&text="+ uri, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "microsoft-azure-translation-v1.p.rapidapi.com",
        "x-rapidapi-key": "",
        "accept": "application/json"
      }
    })
    .then(response => response.text())
    .then(translate => {console.log("running translate function:",translate) 
    let div = document.createElement('div')
    div.innerHtml = translate 
    debugger 
})
    .catch(err => {
      console.log(err);
    });
}

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();
        translate(input)
        if(channelId) {
            db.collection('rooms')
                .doc(channelId).collection('messages').add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user.displayName,
                    userImage: user.photoURL
                    //translated: 
                })
            setInput('')
        }
    }
    return (
        <div className="chatInput">
            <form>
                <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    type="text" 
                    placeholder={`Message #${channelName?.toLowerCase()}`} />
                <button type="submit" onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput