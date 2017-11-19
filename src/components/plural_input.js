import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpecialCharacters from './special_characters';

class PluralInput extends Component {
    constructor(props){
        super(props);
        this.state = { value: "", correct: false, incorrect: false, placeholder: "" };
        this.full = "";
    }
    componentWillMount(){
        console.log('?_?', this.props.lang);
        if(this.props.lang === 'french'){
            this.full = `les ${this.props.correct}`
        } else {
            this.full = `die ${this.props.correct}`;
        }
    }
    handleSubmit(event){
        event.preventDefault();
        // this.props.handleCorrect(this.state.value);
        // let full = "";
        // if(this.props.lang === 'french'){
        //     full = `les ${this.props.correct}`
        // } else {
        //     full = `die ${this.props.correct}`;
        // }
        
        if(this.state.value === this.full){
            this.setState({ value: "", correct: true }, () => {
                this.props.handleCorrect();
            });
        } else {
            this.setState({ ...this.state, incorrect: true, value: "" });
        }
    }
    handleCharacterClick(id){
        let q = document.querySelector(id).textContent;
        const x = this.state.value;
        this.setState({ value: `${this.state.value}${q}` });
        // this.wordInput.focus();
    }
    handleChange(event){
        const v = event.target.value;
        this.setState({ value: v });
    }
    handleKeys(e){
        if(e.keyCode === 39){
            this.setState({ ...this.state, value: "", placeholder: this.full });
        }
    }
    render(){
        if(this.state.placeholder !== ""){
            console.log('very placeholder?');
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input 
                        ref={ input => this.pluralInput = input }
                        className={"plural-input "+(this.state.correct ? ' very-correct' : '')+(this.state.incorrect ? ' incorrect' : '')}
                        type="text"
                        value={this.state.value}
                        placeholder={this.state.placeholder}
                        onKeyDown={this.handleKeys.bind(this)}
                        onChange={this.props.handleSth.bind(this)}
                        autoFocus={true}
                    />
                </form>
                <SpecialCharacters handleClick={this.handleCharacterClick.bind(this)} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        plural: state.plural,
        lang: state.lang
    };
}

export default connect(mapStateToProps)(PluralInput);