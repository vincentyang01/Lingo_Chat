import React from 'react';
import "./LanguageOverlay.css"

class LanguageOverlay extends React.Component {

    state = {
        clicked: true
    }

    selection = (language) => {
        console.log("Hello from languageoverlay: ", this.props.toggleOverlay)
        this.setState({ clicked: !this.state.clicked })
        // debugger
        this.props.sendLanguage(language)
    }
    
    
    render(){
        return (
            // this.state.clicked ?
                <div className="overlay">
                    <div class="grid-container">
                        <div id="a1" class="grid-item" onClick={(e) => this.selection(e.target.value)} value="ar"><h5>Arabic</h5></div>
                        <div id="a2" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="zh-CHS"><h5>Chinese</h5></div>
                        <div id="a3" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="en"><h5>English</h5></div>  
                        <div id="a4" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="fil"><h5>Filipino</h5></div>
                        <div id="a5" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="fr"><h5>French</h5></div>
                        <div id="a6" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="hi"><h5>Hindi</h5></div>  
                        <div id="a7" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="hi"><h5>Italian</h5></div>  
                        <div id="a8" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="ja"><h5>Japanese</h5></div>
                        <div id="a9" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="ja"><h5>Korean</h5></div>
                        <div id="a10" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="pt"><h5>Portuguese</h5></div>
                        <div id="a11" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="ru"><h5>Russian</h5></div>  
                        <div id="a12" class="grid-item" onClick={(e) => this.selection(e.target.parentElement.innerText)} value="ru"><h5>Spanish</h5></div>  
                    </div>
                </div> 
                // : ""       
            
        )
    }


}

export default LanguageOverlay