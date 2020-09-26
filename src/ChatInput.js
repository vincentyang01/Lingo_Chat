import React, { useState } from 'react';
import './ChatInput.css';
import db from "./firebase"
import { useStateValue } from "./StateProvider"
import firebase from "firebase"




function ChatInput({ channelName, channelId }) {
    let translate = ''
    const [input, setInput] = useState('');
    //const [translate, setTranslate] = useState('');
    const [{ user }] = useStateValue();
    const sendMessage = (e) => {
        e.preventDefault();
        let uri = encodeURI(input)
        let lang = 'en'
        
        fetch(`https://microsoft-azure-translation-v1.p.rapidapi.com/translate?from=${lang}&to=es&text=${uri}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "microsoft-azure-translation-v1.p.rapidapi.com",
            "x-rapidapi-key": "",
            "accept": "application/json"
          }
        })
        .then(response => response.text())
        .then(translated => {console.log("running translate function:",translated) 
        let words = translated
        let first = words.split(">")
        let second = first[1].split("<")
        translate = second[0]

        
         
        })
        .catch(err => {
          console.log(err);
        });
        setTimeout(function(){if(channelId) {
           
            db.collection('rooms')
                .doc(channelId).collection('messages').add({
                    message: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user.displayName,
                    userImage: user.photoURL,
                    translation: translate
                })

            setInput('')
        } }, 1000);
        
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