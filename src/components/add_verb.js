import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createVerb, fetchWord, patchVerb } from './../actions';
 
class AddVerb extends Component {
    constructor(props){
        super(props);

        this.state = { sameTense: false, tense: "" };
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
        //values are in a different format than needed to post to DB
        const db_obj = {
            word: values.word,
            meaning: values.meaning,
            conj: [
                { 
                    time: values.time,
                    ich: values.ich,
                    du: values.du,
                    er_sie_es: values.er_sie_es,
                    wir: values.wir,
                    ihr: values.ihr,
                    sie_Sie: values.sie_Sie
                }
            ]
        };
        this.setState({ sameTense: false, tense: db_obj.conj[0].time });
        this.props.fetchWord(db_obj.word).then((ret) => {
            console.log('fetched', ret.payload.data);
            if(ret.payload.data === ""){
                //there is no such word, create a new one
                this.props.createVerb(db_obj).then(() => {
                    console.log('inserted');
                    //possibly reset state here
                    this.setState({ sameTense: false, tense: "" });
                    this.props.history.push("/");
                });
            } else {
                //update existing record
                ret.payload.data.conj.forEach((item) => {
                    if(item.time === this.state.tense){//db_obj.conj[0].time
                        //same tense, show an error- HOW?
                        //return something so that for loop stops
                        return this.setState({ sameTense: true, tense: item.time }, () => {
                            // console.log('state', this.state);
                        });
                    }
                });
                console.log('state', this.state);
                if(!this.state.sameTense){
                    this.setState({ sameTense: false, tense: "" });
                    //tenses are different - update record
                    ret.payload.data.conj.push(db_obj.conj[0]);
                    // console.log(ret.payload.data);
                    this.props.patchVerb(ret.payload.data);
                    this.props.history.push('/');
                         
                }
            }
        });
        
        // this.props.createVerb(db_obj);
    }
    render(){
        const { handleSubmit } = this.props;
        return (
            <div className="add-verb-container">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} autoComplete="off">
                    <Field label="Verb" name="word" component={this.renderField} />
                    <Field label="Meaning" name="meaning" component={this.renderField} />
                    <Field label="Tense" name="time" component={this.renderField} />
                    {
                        this.state.sameTense === true &&
                        <div className="same-tense">This tense has already been added</div>
                    }
                    <Field label="Ich" name="ich" component={this.renderField} />
                    <Field label="Du" name="du" component={this.renderField} />
                    <Field label="Er, sie, es" name="er_sie_es" component={this.renderField} />
                    <Field label="Wir" name="wir" component={this.renderField} />
                    <Field label="Ihr" name="ihr" component={this.renderField} />
                    <Field label="Sie, sie" name="sie_Sie" component={this.renderField} />
                    <button type="submit">Save</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        word: state.word
    };
}

function validate(values){
    const errors = {};
    if(!values.word || values.word.length < 2) errors.word = "Enter a verb";
    if(!values.meaning) errors.meaning = "Meaning missing";
    if(!values.time) errors.time = "Tense missing";
    if(!values.ich) errors.ich = "Empty field";
    if(!values.du) errors.du = "Empty field";
    if(!values.er_sie_es) errors.er_sie_es = "Empty field";
    if(!values.wir) errors.wir = "Empty field";
    if(!values.ihr) errors.ihr = "Empty field";
    if(!values.sie_Sie) errors.sie_Sie = "Empty field";
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostVerb'
})(
    connect(mapStateToProps, { createVerb, fetchWord, patchVerb })(AddVerb)
);