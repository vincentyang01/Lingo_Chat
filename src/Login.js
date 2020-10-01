import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core"
import { auth, provider } from "./firebase"
import { actionTypes } from "./reducer"
import { useStateValue } from './StateProvider'
import firebase from 'firebase';


function Login() {

    const [state, dispatch] = useStateValue()
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                
                console.log("This is the results!!!!!!!!!!!!!!", result)
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })

            })
            .catch((error) => {
                alert(error.message)
            });
            
    };

    return(
        <div className="login">
            <div className="login_container">
                <img src="" alt=""/>
                <h1> Lingo Chat </h1>
                <Button onClick={signIn}> Sign in with Google </Button>
            </div>
        </div>
    )
}

export default Login
