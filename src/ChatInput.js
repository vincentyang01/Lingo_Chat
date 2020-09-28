import React, { useState } from 'react';
import './ChatInput.css';
import db from "./firebase"
import { useStateValue } from "./StateProvider"
import firebase from "firebase"



function ChatInput({ channelName, channelId }) {
    let [lang, setLang] = useState('es');
    
    let translate = ''
    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();
    const sendMessage = (e) => {
 
        e.preventDefault();
       
        let uri = encodeURI(input)
        
        
        
        fetch(`https://microsoft-azure-translation-v1.p.rapidapi.com/translate?to=${lang}&text=${uri}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "microsoft-azure-translation-v1.p.rapidapi.com",
            "x-rapidapi-key": "",
            "accept": "application/json"
          }
        })
        .then(response => response.text())
        .then(translated => {
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
                    translation: translate,
                    language: lang
                   
                })
                
            setInput('')
        } }, 500);
        
        
    }
    return (
        <div className="chatInput">
            
            <form>
                <select onChange={(e) => setLang(e.target.value)}>
                <option value="" disabled selected hidden>Select language to translate to...</option>
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="zh-CHS">Chinese</option>
                <option value="fil">Filipino</option>
                <option value="fr">French</option>
                <option value="hi">Hindi</option>
                <option value="ja">Japanese</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="es">Spanish</option>
            </select>
                <input 
                
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    type="text" 
                    placeholder={`Message #${channelName?.toLowerCase()}`} />
                <button type="submit" onClick={sendMessage}>SEND</button>
            </form>
            {/* <div class="select">    
            <span class="lang">Message will translate in....</span>    */}
            
  
       
        {/* </div> */}
        </div>
    )
}

export default ChatInput