import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatGeneralMessages extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log('general chat mounting');
        this.container.scrollTop = this.container.scrollHeight;
    }
    componentDidUpdate(){
        let last;
        let secondLast;
        if(this.container && this.container.lastChild && this.container.lastChild.previousElementSibling){
            last = this.container.lastChild.clientHeight;
            secondLast = this.container.lastChild.previousElementSibling.clientHeight;
        }
        // console.log('handleScroll', this.container.scrollTop, this.container.scrollHeight, this.container.clientHeight);
        // if(this.container.scrollHeight > this.container.clientHeight){
        //+ another 20 perhaps? >= then it should always be greater, right?
        //|| this.container.scrollTop < this.container.scrollHeight - this.container.clientHeight
            if(this.container.scrollTop+ this.container.clientHeight+last+secondLast >= this.container.scrollHeight){
                // console.log('qq', this.container.scrollTop, this.container.scrollHeight- this.container.clientHeight);
            //- this.container.clientHeight i dont need to substract it..
            this.container.scrollTop = this.container.scrollHeight;
        }
    }
    renderMessages(){
        return this.props.global.map((item, index) => {
            return (
                <div className="chat-full-general-messages-single" key={index}>{item.writing}: {item.message}</div>
            );
        });
    }
    render(){
        // console.log('gg', this.props.global);
        return (
            <div ref={div => this.container = div} className="chat-full-general-messages">{this.renderMessages()}</div>
        );
    }
}

function mapStateToProps(state){
    return {
        global: state.global_messages
    };
}

export default connect(mapStateToProps)(ChatGeneralMessages);