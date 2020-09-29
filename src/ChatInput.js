import React, { useState } from 'react';
import './ChatInput.css';
import db from "./firebase"
import { useStateValue } from "./StateProvider"
import firebase from "firebase"



function ChatInput({ channelName, channelId, language }) {
    let convertToThisCode = "en"
    // let [lang, setLang] = useState('');
    console.log("I'm inside chat input. What are the props? ", language)
    // console.log("Checking reassignment to code", lang)

    let translate = ''
    let nativeLang = ''
    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();

    const languageCode = () => {
        console.log("In ChatInput, under languageCode: ", language)
        // debugger
        if(language === "English") {convertToThisCode = "en"}
        else if(language === "Arabic") {convertToThisCode = "ar"} 
        else if(language === "Chinese") {convertToThisCode = "zh-CHS"}
        else if(language === "Filipino") {convertToThisCode = "fil"}
        else if(language === "French") {convertToThisCode = "fr"}
        else if(language === "Hindi") {convertToThisCode = "hi"}
        else if(language === "Italian") {convertToThisCode = "it"}
        else if(language === "Japanese") {convertToThisCode = "ja"}
        else if(language === "Korean") {convertToThisCode = "ko"}
        else if(language === "Portuguese") {convertToThisCode = "pt"}
        else if(language === "Russian") {convertToThisCode = "ru"}
        else if(language === "Spanish") {convertToThisCode = "es"}
        else if(language === "Hebrew") {convertToThisCode = "he"}
        else if(language === "German") {convertToThisCode = "de"}
        else if(language === "Indonesian") {convertToThisCode = "id"}
        else if(language === "Thai") {convertToThisCode = "th"}
        else if(language === "Vietnamese") {convertToThisCode = "vi"}
        else if(language === "Gujarati") {convertToThisCode = "gu"}
    }

    const sendMessage = (e) => {
        e.preventDefault()
        languageCode()
        // setLang(convertToThisCode)
        // console.log("in sendMessage", lang)
        console.log("in sendMessage - convert variable: ", convertToThisCode)
        // debugger
        let uri = encodeURI(input)

        fetch(`https://microsoft-azure-translation-v1.p.rapidapi.com/Detect?text=${uri}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "microsoft-azure-translation-v1.p.rapidapi.com",
                "x-rapidapi-key": ""
            }
            })
            .then(response => response.text())
            .then(detectedLang => {
            let words = detectedLang
            let first = words.split(">")
            let second = first[1].split("<")
            nativeLang = second[0]
            })
            .catch(err => {
                console.log(err);
            }
        );
        
        
        
        fetch(`https://microsoft-azure-translation-v1.p.rapidapi.com/translate?to=${convertToThisCode}&text=${uri}`, {
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
                    language: nativeLang
                })
                console.log("native langauge ",nativeLang)
            setInput('')
        } }, 500);
        
        
    }
    return (
        <div className="chatInput">
    
            <form>
               
            {/* <select onChange={(e) => setLang(e.target.value)} >
                <option value="en" disabled selected hidden>Select language to translate to...</option>
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
            </select> */}
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