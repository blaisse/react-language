import React, { Component } from 'react';
import { connect } from 'react-redux';
import { expandChat, hideChat } from './../../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import ChatApp from './chat_app';
import { Link } from 'react-router-dom';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = { mounted: false, class: "chat-icon chat-icon-expanded", url: "" };
    }
    // componentDidUpdate(){
    //     console.log('mounting burttton');
    //     if(window.location.href.slice(window.location.href.length-4) === 'chat'){
    //         this.setState({ url: 'chat' });
    //     }
    // }
 
    handleClick(){//&& this.state.class === "chat-icon chat-icon-expanded"
        //adding something with auth here
        // if(!this.props.authenticated){
        //     console.log('click --- auth BAD');
        //     this.props.hideChat();
        // } else
        // console.log('?D?WD?QWED?WE?D?',this.props.authenticated);
         if(this.props.expanded && this.state.class === "chat-icon chat-icon-expanded"){
            // console.log('CSS hide -> display: none for now');
            const c = `${this.divChat.className} chat-hide`;
            // if(this.state.class !== c){
                
            // }
            this.setState({ ...this.state, class: c  });
            // this.divChat.className += " chat-hide";
            // console.log(this.divChat.className);
            // this.props.hideChat();
        } else if(!this.props.expanded && !this.state.mounted && this.props.authenticated){
            // console.log('EXPAND PLS OMG ');
            // console.log('huh?');
            this.props.expandChat();
            // this.setState({ mounted: true });
        } else {
            // console.log('CSS working here -> show again');
            this.setState({ ...this.state, class: "chat-icon chat-icon-expanded" });
        }
    }
    renderChat(){
        if(this.props.url === 'chat'){
            return;
        }
        if(this.props.expanded && !this.state.mounted){
            return (
                <div>
                    {/* <div className="chat-icon-expanded-button" onClick={this.handleClick.bind(this)}>Hide</div> */}
                    <div ref={(div) => { this.divChat = div; }} className={this.state.class}>
                        <ChatApp />
                    </div>
                </div>

            );
        } 
        // else {
        //     return <div className={"chat-icon"} onClick={this.handleClick.bind(this)}>Open Chat</div>;
        // }
    }
    renderButton(){
        // console.log('url', this.props.url);
        // console.log(window.location.href.slice(window.location.href.length-4));
        // if(window.location.href.slice(window.location.href.length-4) === 'chat'){
        //     console.log('not show...');
        //     // this.setState({});
        //     return;
        // }
        if(this.props.url === 'chat'){
            console.log('very chat');
            return;
        }
        if(!this.props.authenticated) {
            return <Link className={"chat-click chat-icon"} to="/signin">Sign In To Chat</Link>;
        }
        return <Link className={"chat-click chat-icon"} to="/chat">Chat</Link>;
        // if(!this.props.authenticated && !this.props.expanded){
        //     return <Link className={"chat-click chat-icon"}>Sign In To Chat</Link>;
        // } else if(!this.props.expanded && !this.state.mounted){//both false, chat was never mounted
        //     return <Link className={"chat-click chat-icon"} to="/chat">Chat</Link>;
        // } else if(this.state.class === "chat-icon chat-icon-expanded chat-hide"){
        //     return <Link className={"chat-click chat-icon"} to="/chat">Chat</Link>;
        // } else {
        //     return <Link className="chat-click chat-icon-expanded-button" to="/chat">Hide</Link>;
        // }
        // if(!this.props.authenticated && !this.props.expanded){
        //     return <div className={"chat-click chat-icon"} onClick={this.handleClick.bind(this)}>Sign In To Chat</div>;
        // } else if(!this.props.expanded && !this.state.mounted){//both false, chat was never mounted
        //     return <div className={"chat-click chat-icon"} onClick={this.handleClick.bind(this)}>Chat</div>;
        // } else if(this.state.class === "chat-icon chat-icon-expanded chat-hide"){
        //     return <div className={"chat-click chat-icon"} onClick={this.handleClick.bind(this)}>Chat</div>;
        // } else {
        //     return <div className="chat-click chat-icon-expanded-button" onClick={this.handleClick.bind(this)}>Hide</div>;
        // }
    }
    render(){
        const name = `${this.props.expanded ? 'chat-icon-expanded' : ''}`;
        return (
            // <div className={"chat-icon " + name} onClick={this.handleClick.bind(this)}>Heil Hitler</div> 
            <div>
                 {this.renderChat()}       
                {this.renderButton()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        expanded: state.chat.expanded,
        authenticated: state.auth.authenticated,
        url: state.url
    };
}

export default connect(mapStateToProps, { expandChat, hideChat })(Chat);