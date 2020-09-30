import React, { useState, useEffect } from 'react';
import "./Sidebar.css"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import CreateIcon from "@material-ui/icons/Create"
import SidebarOption from "./SidebarOption"
import AddIcon from "@material-ui/icons/Add"
import db from "./firebase"
import { useStateValue } from "./StateProvider"
import LanguageOverlay from './LanguageOverlay'
// import DeleteRounded from '@material-ui/icons/DeleteRounded'


function Sidebar(props){
    const [channels, setChannels] = useState([])
    const [{ user }] = useStateValue();
    const [panel, setPanel] = useState(true);

    const show = () => {
        setPanel(!panel)
    }

    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot) => (
            setChannels(
                snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name
            }))
            )
            )
        );
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <div className="sidebar_info">
                    <h2>Lingo Chat</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        { user?.displayName}
                    </h3>
                </div>
                <CreateIcon />
            </div>
            <div className="langSelect" onClick={() => show()}> Select Language
                {panel ? <LanguageOverlay sendLanguage={props.sendLanguage} /> : null}
            </div>
            
            <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
            

            {/* Connect to DB and list all the channels with SidebarOption */}
            {channels.map(channel => (
                <SidebarOption title={channel.name} id={channel.id} />
            ))}
        </div>
    )
}

export default Sidebar;
