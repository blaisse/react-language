import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


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
    handleChange(event){
        this.setState({ answer: event.target.value }, () => {
            // console.log(this.state);
        });
    }
    onSubmit(event){
        event.preventDefault();
        if(this.state.answer === this.props.picked) this.setState({ answer: "", incorrect: false });
        if(this.state.answer !== this.props.picked) this.setState({ answer: "", incorrect: true });
        this.props.onAnswerChange(this.state.answer);
    }
    render(){
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <input className={"input-verb "+(this.state.incorrect ? 'incorrect' : '')} type="text" autoFocus={true} value={this.state.answer} onChange={this.handleChange.bind(this)} />
            </form>
        );
    }
}

// export default reduxForm({
//     form: 'AnswerForm'
// })(
//     connect(null, null)(InputVerb)
// );

export default InputVerb;