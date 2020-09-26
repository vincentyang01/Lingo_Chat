import React from 'react'
import "./Login.css"
import {Button} from "@material-ui/core"
import {auth, provider} from './firebase'

function Login() {

    

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
        alert(error.message)
        })
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://lh3.googleusercontent.com/proxy/lt-21bCywV4NtWDkxmnWnlKUnWngaRjo6rSx2npdwx2PPw8295NIX7LvDMCfUA0Yp5ppzPiwLZt2tJ-8277Bc-c" alt=""/>
                <h1>Sign in to Chatslator</h1>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login
