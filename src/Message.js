import React, {useState} from 'react'
import "./Message.css"
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import Linkify from 'react-linkify';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'


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
    
    const deleteThis = (e) => {
        e.target.parentElement.parentElement.remove()

        // var database = firebase.database().ref();
        // var postsRef = database.child("posts");


    }

    return(
        self ? <div className="me"> 
            <DeleteRoundedIcon className="del" onClick={(e) => deleteThis(e)}/>
            <div className="message_info">
                
            <h4>
                <span className="message_timestamp">
                    {" " + new Date(timestamp?.toDate()).toDateString()} {new Date(timestamp?.toDate()).toLocaleTimeString()}
                </span>
            </h4>
            <Linkify><p class="my msg">{message}</p></Linkify>
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
            
    <span>{language === 'fil-PH' || language === 'gu' ? null : <VolumeDownIcon/>}</span><span class="msg" data-id={language} onClick={(e) => getTranslation(e, language)}><Linkify>{message}</Linkify></span>
            <div></div>
            <pre>
                <br></br>
                <code class="translate" >{translation}
                </code>
            </pre>
            
            <audio id="audio" src={audioTranslation}></audio>
        

            </div>
        </div>
    )
}

export default Message