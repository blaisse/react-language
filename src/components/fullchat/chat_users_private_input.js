import React, { Component } from 'react';

class ChatUsersPrivateInput extends Component {
    constructor(props){
        super(props);
        this.state = { value: "" };
    }
    componentDidMount(){
        this.messageInput.focus();
    }
    handleSubmit(e){
        e.preventDefault();
        // console.log('me is submit');
        // console.log(this.state.value);
        this.props.sendInput(this.state.value);
        this.setState({ value: "" });
    }
    handleChange(e){
        this.setState({ value: e.target.value });
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="chat-full-users-private-input">
                <input 
                    ref={input => this.messageInput = input}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    className="chat-full-users-private-input-field"
                    type="text"
                 />    
            </form>
        );
    }
}

export default ChatUsersPrivateInput;