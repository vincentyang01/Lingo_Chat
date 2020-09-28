import React, {useState} from 'react';
import './Header.css';
import { Avatar } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'
import { useStateValue } from "./StateProvider"
import LanguageOverlay from './LanguageOverlay'


function Header(props) {
    const [{ user }] = useStateValue();
    const [panel, setPanel] = useState(true);

    const show = () => {
        // console.log("before set: ", panel)
        setPanel(!panel)
        // setTimeout(function(){console.log("Inside show", panel)}, 500);
        // console.log("Inside show", panel)

    }

    

    return(
        <div className="header">
            <div className="header_left">
                <Avatar className="header_avatar" 
                    alt={user?.displayName} 
                    src={user?.photoURL} />
            </div>
            <div className="header_search" onClick={() => show()}>
                <SearchIcon /> <h2>Select Language</h2>
                {panel ? <LanguageOverlay sendLanguage={props.sendLanguage} /> : null}
                {/* <LanguageOverlay sendLanguage={props.sendLanguage} /> */}
            </div>
            <div className="header_right">
            </div>
        </div>
    )
}

export default Header