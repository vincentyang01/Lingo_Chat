import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core"
import { auth, provider } from "./firebase"
import { actionTypes } from "./reducer"
import { useStateValue } from './StateProvider'

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
                const optionsGET = { //Create options for a get
                    "method": "GET", 
                    "header": { 
                        "Content-Type": "application/json", 
                        "accept": "application/json" 
                    },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email })}
                const optionsPOST = { //Create options for a post
                    "method": "POST",
                    "header": {
                        "Content-Type": "application/json",
                        "accept": "application/json"
                    },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email })}
                {fetch("http://localhost:3000/users/", optionsGET) //If the user exists, login else create
                    ?  
                        (dispatch({
                            type: actionTypes.SET_USER,
                            user: result.user
                        }))
                    : (fetch("http://localhost:3000/users/", optionsPOST))
                    }

            })
            .catch((error) => {
                alert(error.message)
            });
            
    };

    return(
        <div className="login">
            <div className="login_container">
                <img src="" alt=""/>
                <h1> Sign in to Multi-Chat </h1>
                <Button onClick={signIn}> Sign in with Google </Button>
            </div>
        </div>
    )
}

export default Login


// import React from 'react';
// import "./Login.css";
// import { Button } from '@material-ui/core';
// import { auth, provider } from './firebase';
// import { useStateValue } from './StateProvider';
// import { actionTypes } from './reducer';

// function Login() { 
//     const [state, disaptch] = useStateValue();

//     const signIn = () => {
//         auth
//         .signInWithPopup(provider)
//         .then((result) => {
//             console.log(result);
//             disaptch({
//                 type: actionTypes.SET_USER,
//                 user:result.user
//             })
//         })
//         .catch((error) =>{
//             alert(error.message)
//         });
//     };
//     return (
//         <div className="login">
//             <div className="login__container">
//                 <img src="https://i.pcmag.com/imagery/reviews/07td46ju7p6lLVb0QGwc5VF-6..v_1569479844.jpg" alt=""/>

//                 <h1>Sign in to Slack Clone</h1>
//                 <p>sach.slack.com</p>
//                 <Button onClick={signIn}>Sign in with Google</Button>

//             </div>
            
//         </div>
//     )
// }

// export default Login;
