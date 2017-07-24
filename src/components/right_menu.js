import React, { Component } from 'react';

class RightMenu extends Component {
    render(){
        return (
            <div className={"right-menu " + (this.props.open ? 'right-menu-open' : '') }>
                 <p>Hello, how are you? This is a sample collection of photos of a very random person showing his fondness of the jews.     
                </p> 
                 {/* HEIL HEIL LOOL OMFG SO XD LUL  */}
                   <img src="https://i.giphy.com/media/ntmBgj2X9FLGM/giphy.webp" alt=""/>  
                <p>Have fun learning German!</p> 
            </div>
        );
    }
}

export default RightMenu;