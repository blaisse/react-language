import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Editor, EditorState} from 'draft-js';



class FlashcardSingle extends Component {
    constructor(props){
        super(props);
        this.state = { value: "" };
    }
    handleChange(event){
        // console.log('?', event.target.value);
        // console.log(this.props.lang);
        // this.props.handleFlashcard(event, this.props.lang, this);
        
        // console.log(event.target.value);
        // this.setState({ value: event.target.value });
        this.props.handleOutput(event.target.value);
    }
    render(){
        return (//this.handleChange.bind(this)
            <textarea data-index={this.props.index} onKeyDown={this.props.handleTab} onChange={this.handleChange.bind(this)} className="flashcard-edit"></textarea>
        );
    }
}

export default FlashcardSingle;