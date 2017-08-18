import React, { Component } from 'react';
import { connect } from 'react-redux';

class InputFlashcard extends Component {
    constructor(props){
        super(props);
        this.state = { flashcard: "" };
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.handleGuess(this.state.flashcard);
    }
    render(){
        const { handleSubmit } = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" value={this.state.flashcard} onChange={this.props.handleSth.bind(this)} autoFocus={true} />
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        lang: state.lang
    };
}

export default connect(mapStateToProps)(InputFlashcard);