import React, { Component } from 'react';

class RightMenu extends Component {
    render(){
        return (
            <div className={"right-menu " + (this.props.open ? 'right-menu-open' : '') }>
                Hello
                <img src="https://2ch.hk/v/src/1727220/14859348520470.jpg" alt=""/>
                 {/* HEIL HEIL LOOL OMFG SO XD LUL  */}
                 {/* <img src="https://i.giphy.com/media/ntmBgj2X9FLGM/giphy.webp" alt=""/>  */}
            </div>
        );
    }
}

export default RightMenu;