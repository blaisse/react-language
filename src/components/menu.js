import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    render(){
        return (
            <div className="menu-container">
                <Link to="/">Home</Link>
                <Link to="/add">Add Verb</Link>
                <Link to="/">Home</Link>
            </div>
        );
    }
}

export default Menu;