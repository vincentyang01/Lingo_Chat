import React, { useState } from 'react';
import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Chat from "./Chat"
import Login from "./Login"
import { useStateValue } from "./StateProvider"


function App(props) {
  const [{ user }, dispatch] = useStateValue()
  const [language, setLanguage] = useState(props)

  let sendLanguage = (props) => {
    setLanguage(props)
    console.log("Back in App: PROPS: ", props, "Language: ", language)
  }

    
  return (
    <div className="app">
      <Router>
        {!user 
        ? ( <Login />)
        : (
        <>
          {/* <Header /> */}
          <div className="app_body">
            <Sidebar sendLanguage={sendLanguage}/>
            <Switch>
              <Route path="/room/:roomId">
                <Chat user={user} sendLanguage={language} />
              </Route>
              <Route path="/">
                {/* <h1>Welcome!</h1> */}
              </Route>
            </Switch>
          </div>
        </>
        )}
      </Router>
    </div>
  );
}

export default App;
