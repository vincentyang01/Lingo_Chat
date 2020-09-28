import React, { useState } from 'react';
import './ChatInput.css';
import db from "./firebase"
import { useStateValue } from "./StateProvider"
import firebase from "firebase"



function ChatInput({ channelName, channelId, language }) {

    let [lang, setLang] = useState('');
    console.log("I'm inside chat input. What are the props? ", language)
    console.log("Checking reassignment to code", lang)

    let translate = ''
    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();

    const languageCode = () => {
        console.log("In ChatInput, under languageCode: ", language)
        debugger
        if(language === "English") {setLang("en")}
        else if(language === "Arabic") {
            setLang("ar")
        } 
        else if(language === "Chinese") {
            setLang("zh-CHS")
        }
        else if(language === "Filipino") {setLang = "fi"}
        else if(language === "French") {setLang = "fr"}
        else if(language === "Hindi") {setLang = "hi"}
        else if(language === "Italian") {setLang = "it"}
        else if(language === "Japanese") {setLang = "ja"}
        else if(language === "Korean") {setLang = "kr"}
        else if(language === "Portuguese") {setLang = "pt"}
        else if(language === "Russian") {setLang = "ru"}
        else if(language === "Spanish") {setLang = "es"}
    }

    const sendMessage = (e) => {
        e.preventDefault()
        languageCode()
        console.log("in sendMessage", lang)
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
                <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    type="text" 
                    placeholder={`Message #${channelName?.toLowerCase()}`} />
                <button type="submit" onClick={() => sendMessage(lang)}>SEND</button>
            {/* </form> */}
            {/* <div>        */}
            <select onChange={(e) => setLang(e.target.value)} >
                <option value="" disabled selected hidden>Select language to translate to...</option>
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="zh-CHS">Chinese</option>
                <option value="fil">Filipino</option>
                <option value="fr">French</option>
                <option value="hi">Hindi</option>
                <option value="it">Italian</option>
                <option value="ja">Japanese</option>
                <option value="kr">Korean</option>
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