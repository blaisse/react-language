import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SpecialCharacters from './special_characters';


class InputVerb extends Component {
    constructor(props){
        super(props);
        this.state = { answer: "", incorrect: false, correct: false, placeholder: "" };
    }
    renderField(){
        return (
            <input placeholder="answer.." type="text" />
        );
    }
    onSubmit(event){
        event.preventDefault();
        if(this.state.answer === this.props.picked) this.setState({ answer: "", incorrect: false, correct: true }, () => {
            // console.log(' ? ?FW?F',this.state.correct);
        });
        if(this.state.answer !== this.props.picked) this.setState({ answer: "", incorrect: true, correct: false });
        this.props.onAnswerChange(this.state.answer);
    }
    handleCharacterClick(id){
        let q = document.querySelector(id).textContent;
        const x = this.state.incorrect;
        this.setState({ answer: `${this.state.answer}${q}`, incorrect: x });
        this.verbInput.focus();//articles doesnt have special characters..i hope
    }
    displaySpecialCharacters(){
       
    }
    handleKey(e){
        if(e.keyCode === 39){
            console.log(this.props.picked);
            this.setState({ ...this.state, answer: "", placeholder: this.props.picked });
        }
    }
    render(){
        const { handleSubmit } = this.props;
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input
                        ref={ input => this.verbInput = input }
                        onKeyDown={this.handleKey.bind(this)}
                        placeholder={this.state.placeholder}
                        className={"input-verb "+(this.state.incorrect ? 'incorrect' : '')+(this.state.correct ? ' very-correct' : '')}
                        type="text" autoFocus={true}
                        value={this.state.answer}
                        onChange={this.props.handleVerb.bind(this)}
                    /> 
                     {/* <input ref={ input => this.verbInput = input } className={"input-verb "+(this.state.incorrect ? 'incorrect' : '')} type="text" autoFocus={true} value={this.state.answer} onChange={this.handleChange.bind(this)} />  */}
                </form>
                {this.displaySpecialCharacters()}
                <SpecialCharacters handleClick={this.handleCharacterClick.bind(this)} />
            </div>
        );
    }
}

// export default reduxForm({
//     form: 'AnswerForm'
// })(
//     connect(null, null)(InputVerb)
// );
function mapStateToProps(state){
    return {
        lang: state.lang
    };
}

export default connect(mapStateToProps)(InputVerb);