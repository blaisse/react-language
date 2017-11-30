import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import RightMenu from './right_menu';
import { connect } from 'react-redux';
import { 
    pushContent, setPrivateMessages,
    fullChatConnected, fullChatNotificationClear,
    fullChatOldNotification,fullChatNotification
} from './../actions';

import io from 'socket.io-client';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = { open: false };
        this.socket = io('http://localhost:3007');
        this.notification = "";
        this.id;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.push){
            this.notification = null;
        }
        if(nextProps.fullChat){
            if(nextProps.fullChat.notification){
                // console.log('this?', nextProps.fullChat.notification);
                clearTimeout(this.id);
                this.notification = null;
                this.props.fullChatNotificationClear();
                // console.log('this----', nextProps.fullChat.notification);                
            }
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.fullChat.notification){
            // console.log('very notify - did update', prevProps.fullChat.notification);
            // this.props.fullChatNotification(prevProps.fullChat.notification);
            this.notification = prevProps.fullChat.notification;
            // console.log('this not', this.notification);
            this.id = setTimeout(() => {
                this.notification = null;
                this.props.fullChatNotificationClear();
                // console.log('clear called');
            }, 4000);
            // console.log('state updated', this.props.fullChat.notification);
        }
    }
    showMenu(){
        if(this.state.open){
            return (
                <div>
                    <RightMenu open={this.state.open} />
                </div>
            );
        } else {
            return ( <div></div> );
        }
    }
    handleClick(){
        if(this.state.open){
            this.setState({ open: false }, () => {
                this.props.pushContent(this.state.open);
            });
        } else {
            this.setState({ open: true }, () => {
                this.props.pushContent(this.state.open);
            });
        }
    }
    handleKey(){
        console.log('esc pressed!');
    }
    renderSign(){
        if(this.props.authenticated){
            return (
                <div className="menu-container-out"><Link to="/signout">Sign Out</Link></div>
            );
        } else {
            return (
                <div className="menu-container-out">
                    <Link to="signin" key="1">Sign In</Link>
                    <Link to="signup" key="2">Sign Up</Link>
                </div>
            );
            // return [
            //     <Link to="signin" key="1">Sign In</Link>,
            //     <Link to="signup" key="2">Sign Up</Link>
            // ];
        }
    }
    handleNotification(){
        // console.log('notifications help.', this.props.fullChat.notification, this.props.fullChat.old_notification);
        // if(this.props.fullChat.notification && this.props.fullChat.notification !== this.props.fullChat.old_notification){
            // console.log('same dont show');
            // return (
            //     <div className="chat-full-notification">New message from <span className="other-person-notification">{this.props.fullChat.notification}</span></div>
            // );
        // }
        const p = this.props.fullChat.notification;
        // if(this.props.fullChat.notification){
            if(this.notification){
            // this.props.fullChatOldNotification(this.props.fullChat.notification);
            const note = this.notification.message;
            let final;
            if(this.notification.message.length > 15){
                final = `${note.slice(0, 15)}...`;
            } else {
                final = note;
            }
            return (
                <div className="chat-full-notification">
                New message from <span className="other-person-notification">{this.notification.person}</span>
                <div>{final}</div>
                </div>
            );
        }
    }
    render(){
        
        // console.log('meniu--', this.props.privateMessages);
        // console.log('PRIVATE', this.props.fullChat);
        // console.log('url menu', this.props.url);
      
        return (
            <div className="menu-container">
                {/* <Link to="/">Home</Link> */}
                <div className="menu-container-logo"><span><strong>French & German</strong></span></div>
                <div className="menu-container-links">
                <Link exact to="/">Change language</Link>
                <Link to="/tenses">Tenses</Link>
                <Link to="/noun">Practise Nouns</Link>
                <Link to="flashcards">Flashcards</Link>
                <Link to="/plural">Plural</Link>
                <Link to="/blocks">Blocks</Link>
                <Link to="/chat">Chat</Link>
                </div>
                {this.renderSign()}
                <div className={"menu-icon " + (this.props.push ? 'menu-icon-close' : '')} onClick={ this.handleClick.bind(this) }><div className="menu-icon-middle"></div></div>
                {/* <div className=" menu-bar-icon"><i className="fal fa-bars" onClick={ this.handleClick.bind(this) }></i></div> */}
                 {/* {this.showMenu()}  */}
                 <RightMenu open={this.state.open} />
                 {this.handleNotification()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return { 
     verb: state.verb,
     time: state.time,
     times: state.times,
     push: state.pushContent,
     authenticated: state.auth.authenticated,
    //  url: state.url,
    //  privateMessages: state.privateMessages,
     fullChat: state.fullChat
    };
}

// export default Menu;
export default connect(mapStateToProps, { pushContent, setPrivateMessages, fullChatConnected,
    fullChatNotificationClear,
    fullChatOldNotification,
    fullChatNotification

})(Menu);