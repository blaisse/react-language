import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SpecialCharacters from './special_characters';


class InputVerb extends Component {
    constructor(props){
        super(props);
        this.state = { answer: "", incorrect: false };
    }
    renderField(){
        return (
            <input placeholder="answer.." type="text" />
        );
    }
    // handleChange(event){
    //     event.preventDefault();
    //     let q = event.target.value;
    //     const val = event.target.value[event.target.value.length-1];
    //     if(this.props.lang === 'french'){
    //         if(val === '1'){
    //             q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(233)}`;
    //         } else if(val === '2'){
    //             q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(231)}`;
    //         } else if(val === '3'){
    //             q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(234)}`;
    //         } else if(val === '4'){
    //             q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(249)}`;
    //         }
    //     } else if(this.props.lang === 'german' || this.props.lang === null){
    //         if(val === '1'){
    //             q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(252)}`;
    //         } else if(val === '2'){
    //             q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(246)}`;
    //         } else if(val === '3'){
    //             q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(223)}`;
    //         } else if(val === '4'){
    //             q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(228)}`;
    //         } else if(val === '5'){
    //            q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(233)}`; 
    //         }            
    //     }

    //     this.setState({ answer: q });
    // }
    onSubmit(event){
        event.preventDefault();
        if(this.state.answer === this.props.picked) this.setState({ answer: "", incorrect: false });
        if(this.state.answer !== this.props.picked) this.setState({ answer: "", incorrect: true });
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
    render(){
        const { handleSubmit } = this.props;
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                     <input ref={ input => this.verbInput = input } className={"input-verb "+(this.state.incorrect ? 'incorrect' : '')} type="text" autoFocus={true} value={this.state.answer} onChange={this.props.handleVerb.bind(this)} /> 
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