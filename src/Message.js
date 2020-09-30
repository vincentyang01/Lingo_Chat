import React, {useState} from 'react'
import "./Message.css"
import VolumeDownIcon from '@material-ui/icons/VolumeDown';



function Message({message, timestamp, user, userImage, translation, me, language}) {
    let self = me === user
    let uri = encodeURI(message)
    let audioTranslation = ""


    //let [lang, setLang] = useState('en');
    
    const getTranslation = (e, language) => {
        
        const lang = language
        const sentance = encodeURI(e.target.innerText)
        // voice response
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
        new Audio(url).play()
    }

    const links = () => {
        let tokens = message.split(" ")
        for(let i = 0; i < tokens.length; i++) {
            if(tokens[i].includes("http")){
                tokens[i] =  `<html><a href="${tokens[i]}"></a></html>`
                // let link = tokens[i].link(tokens[i])
                // tokens[i] = link
            }
        }
        let messageWithLink = tokens.join(' ')
        // console.log("What is the message now? " + messageWithLink)
        return messageWithLink
        
    }
    
    



    return(
        self ? <div className="me"> 
                <span className="message_timestamp">
                    {" " + new Date(timestamp?.toDate()).toDateString()} {new Date(timestamp?.toDate()).toLocaleTimeString()}
                </span>
            <div className="message_info">
            <h4>
            </h4>
            <p class="my msg">{message}</p>
                {/* <html><p class="msg">{links()}</p></html> */}
            <pre>
            </pre>
            </div>
        </div>: <div className="message">
        <img src={userImage} alt=""/>
            <div className="message_info">
            <h4 class="time_sender">
                {user}
                <span className="message_timestamp">
                    {" " + new Date(timestamp?.toDate()).toDateString()} {new Date(timestamp?.toDate()).toLocaleTimeString()}
                </span>
            </h4>
           {console.log("Message equal to translation: ",message, translation) }
    <span>{language === 'fil-PH' || language === 'gu' || message === translation ? null : <VolumeDownIcon/>}</span>
    {message === translation ? <p><br></br><span class="msg same" data-id={language}>{message}</span></p> : <span class="msg" data-id={language} onClick={(e) => getTranslation(e, language)}>{message}</span>}
            <div></div>
            <pre>
                <br></br>
                {message === translation || translation === "" ? null : <code class="translate" > {translation}</code>}
            </pre>
               
            <audio id="audio" src={audioTranslation}></audio>
           

            </div>
        </div>
    )
}

export default Message