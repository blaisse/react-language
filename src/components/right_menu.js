import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class RightMenu extends Component {
    renderLinks(){
        if(this.props.authenticated){
            return [
                <Link to="/addnoun" key="1">Add Noun</Link>,
                <Link to="/add" key="2">Add Verb</Link>,
                <Link to="/createflashcard" key="3">Create Flashcard Set</Link>, 
                <Link to="/showflashcards" key="4">Show Flashcards</Link>
            ];
        } else {
            return <div>Sign in to see content</div>;
        }
    }
    render(){
        return (
            <div className={"right-menu " + (this.props.open ? 'right-menu-open' : '') }>
                <div className="right-menu-links">
                     {this.renderLinks()}    
                </div>
                   {/* <img src="https://i.giphy.com/media/ntmBgj2X9FLGM/giphy.webp" alt=""/>   */}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(RightMenu);