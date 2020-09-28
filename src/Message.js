import React, {useState} from 'react'
import "./Message.css"



function Message({message, timestamp, user, userImage, translation, me, language}) {
    let self = me === user
    let uri = encodeURI(message)
    let audioTranslation = ""


    //let [lang, setLang] = useState('en');
    
    const getTranslation = (e, language) => {
      
        const lang = language
        const sentance = encodeURI(e.target.innerText)
        
        fetch(`https://microsoft-azure-translation-v1.p.rapidapi.com/Speak?text=${sentance}&language=${lang}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "microsoft-azure-translation-v1.p.rapidapi.com",
                "x-rapidapi-key": ""}})
        .then(response => { 
             audioTranslation = response.url
             play(response.url)
        })
        .catch(err => {console.log(err)});   
        

    }

   
    function play(url) {
       
        //var audio = document.getElementById("audio");
      new Audio(url).play()
    }

    
    
    //setTimeout(function(){ }, 3000);
    



    return(
       self ? <div className="me"> 
            <img src={userImage} alt=""/>
            <div className="message_info">
            <h4>
                {user} 
                <span className="message_timestamp">
                    {new Date(timestamp?.toDate()).toDateString()}, {new Date(timestamp?.toDate()).toLocaleTimeString()}
                </span>
            </h4>
            <p class="msg">{message}</p>
            <pre>
                {self ? null : <code class="translate">{translation}</code>}
            </pre>
            </div>
        </div>: <div className="message">
        <img src={userImage} alt=""/>
            <div className="message_info">
            <h4>
                {user} 
                <span className="message_timestamp">
                    {new Date(timestamp?.toDate()).toDateString()}, {new Date(timestamp?.toDate()).toLocaleTimeString()}
                </span>
            </h4>
            <p class="msg">{message}</p>
            <pre>
                <code class="translate" data-id={language} onClick={(e) => getTranslation(e, language)}>{translation}
                </code>
            </pre>
                {/* <select onChange={(e) => setLang(e.target.value)}>
                <option value="" disabled selected hidden>Select Dialect</option>
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
            </select> */}
         
            <audio id="audio" src={audioTranslation}></audio>
           

            </div>
        </div>
    )
}

export default Message