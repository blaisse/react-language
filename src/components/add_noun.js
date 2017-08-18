import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { addNoun, getNoun } from './../actions';
import SpecialCharacters from './special_characters';

class AddNoun extends Component{
    constructor(props){
        super(props);
        this.state = { exists: false };
    }
    renderField(field){
        const { meta: { touched, error } } = field;//field.meta.touched and field.meta.error
        const className = `input-error-container ${touched && error ? 'input-error-text' : ''}`;
        const classNameInput = `${touched && error ? 'input-error' : ''}`;
        return (
            <div className="add-verb-input">
                <div className="add-verb-input-row">
                    <label>{field.label}</label>
                    <input className={classNameInput} placeholder="" type="text" { ...field.input } />
                </div>
                <div className={className}>{touched ? error : ''}</div> 
            </div>
        );        
    }
    onSubmit(values){
        // console.log('val', values);
        let language = 'german';
        if(this.props.lang){
            language = this.props.lang;
        }
        values.lang = language;
        // this.props.addNoun(values).then((ret) => {
        //     console.log('');
        // });
        this.props.getNoun(values.word).then((ret) => {
            // console.log(ret);
            if(!(ret.payload.data === "")){
                this.setState({ exists: true });
            } else {
                this.props.addNoun(values).then(() => {
                    console.log('Noun added!');
                    // dispatch(reset('PostNoun'));
                    this.props.history.push('/');
                    // this.setState({ exists: false });
                });
            }
        });
    }
    displayError(){
        if(this.state.exists === true){
            return (
                <div>
                    This word is already saved!
                </div>
            );
        }
    }
    handleNothing(){}
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className={"push-container " + (this.props.push ? 'app-push' : '')}>
                <div className="add-verb-container">
                     <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field normalize={this.props.handleAddVerb.bind(this)} label="Article" name="article" component={this.renderField} />
                        <Field normalize={this.props.handleAddVerb.bind(this)} label="Noun" name="word" component={this.renderField} />
                        {this.displayError()}
                        <Field label="Meaning" name="meaning" component={this.renderField} />
                        <Field label="Image" name="img" component={this.renderField} />
                        <button type="submit">Save</button>
                    </form> 
                    <SpecialCharacters handleClick={this.handleNothing} />
                </div>
            </div>
        );
    }
}
function validate(values){
    const errors = {};
    if(!values.article) errors.article = "Enter an article";
    if(!values.word) errors.word = "Enter the noun";
    if(!values.meaning) errors.meaning = "Enter an English translation";
    return errors;
}

function mapStateToProps(state){
    return {
        push: state.pushContent,
        lang: state.lang
    };
}

export default reduxForm({
    validate,
    form: 'PostNoun'
})(
    connect(mapStateToProps, { addNoun, getNoun })(AddNoun)
);