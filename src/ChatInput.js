import React, { useState } from 'react';
import './ChatInput.css';
import db from "./firebase"
import { useStateValue } from "./StateProvider"
import firebase from "firebase"
import Picker from 'emoji-picker-react';


function ChatInput({ channelName, channelId, language }) {
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };
    
    let convertToThisCode = ""

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
        if(input.trim().length > 0){
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
            if(convertToThisCode === ""){
                convertToThisCode = nativeLang
            }
            })
            .catch(err => {
                console.log(err);
            }
    
        );
        
        setTimeout(function(){ 
        
        console.log("before putting in database",convertToThisCode)
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
            console.log("ran stored translate", translate)
        
        
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
                console.log("key of the post ", firebase.database().ref().child('posts').push().key)
                // setKeys()
                setInput('')
        } }, 500);
    }, 500);
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
                {/* <Picker onEmojiClick={onEmojiClick} /> */}
            </form>
            {/* <div class="select">    
            <span class="lang">Message will translate in....</span>    */}
            
        {/* </div> */}
        </div>
    )
}

export default ChatInput