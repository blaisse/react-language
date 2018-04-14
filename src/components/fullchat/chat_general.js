import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatGeneralMessages from './chat_general_messages';
import ChatGeneralInput from './chat_general_input';
import { setGlobalMessages } from './../../actions';

class ChatGeneral extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.socket.on('sendMessage', (message) => {
            //save to global state
            this.props.setGlobalMessages(message);
        });
    }
    render(){
        return (
            <div className="chat-full-general">
                <ChatGeneralMessages />
                <ChatGeneralInput socket={this.props.socket} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userList: state.userList,
        global: state.global_messages
    };
}

export default connect(mapStateToProps, { setGlobalMessages })(ChatGeneral);