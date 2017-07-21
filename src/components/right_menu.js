import React, { Component } from 'react';

class RightMenu extends Component {
    render(){
        return (
            <div className={"right-menu " + (this.props.open ? 'right-menu-open' : '') }>
                Menu
                {/* HEIL HEIL LOOL OMFG SO XD LUL */}
                {/* <img src="https://i.giphy.com/media/ntmBgj2X9FLGM/giphy.webp" alt=""/> */}
            </div>
        );
    }
}

export default RightMenu;