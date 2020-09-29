import React, {useState} from 'react';
import './Header.css';
import { Avatar } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search'
import { useStateValue } from "./StateProvider"


function Header(props) {
    const [{ user }] = useStateValue();


    return(
        <div className="header">
            <div className="header_left">
                <Avatar className="header_avatar" 
                    alt={user?.displayName} 
                    src={user?.photoURL} />
            </div>
            <div className="header_search" >
                <SearchIcon /> <h2>Select Language</h2>
            </div>
            <div className="header_right">
            </div>
        </div>
    )
}

export default Header