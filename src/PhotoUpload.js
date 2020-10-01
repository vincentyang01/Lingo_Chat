import React, { useState } from 'react';
import { storage } from './firebase'
import db from "./firebase"
import firebase from "firebase"

// const db = app.firestore();
// const storage = app.storage();

function PhotoUpload(){
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)


    const fileUploadHandler = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageAsFile => (image))
    }

    const fileSubmitHandler = (e) => {
        e.preventDefault()
        if(imageAsFile === ''){
            console.log(`Not an acceptable file type.`)
        }
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        uploadTask.on('state_changed',
        (snapShot) => {
            console.log(snapShot)
        }, (err) => {
            console.log(err)
        }, () => {
            storage.ref('images').child(imageAsFile.name).getDownloadURL()
            .then(fireBaseUrl => {
                // setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
                setImageAsUrl(fireBaseUrl)
            })
        })
    }
    
    

    return(
        <>
            <form>
                <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={(e) => fileUploadHandler(e)}/>
                <button onClick={(e) => fileSubmitHandler(e)}>Upload</button>
            </form>
            <img src={imageAsUrl} alt="image" width="200" height="200" />
        </>
    )
}


export default PhotoUpload