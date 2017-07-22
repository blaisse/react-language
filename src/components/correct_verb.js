import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVerb } from './../actions';
import InputVerb from './input_verb';
import DisplayAnswer from './display_answer';
import _ from 'lodash';
import classNames from 'classnames';

class CorrectVerb extends Component {
    constructor(props){
        super(props);
        this.answer = null;
        this.picked = null;
        this.tense = null;
    }
    shouldComponentUpdate(nextProps){
        const o = this.props.open !== nextProps.open;
        return !o;
    }
    componentDidMount(){  
        if(!this.props.time){
            //  console.log('xD');
            this.props.fetchVerb(this.props.times);
        } else {
            this.props.fetchVerb(this.props.time);
        }
    }
    pickRandomPerson(){
        const p = ['ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'];
        var picked = p[Math.floor(Math.random()*6)];
        if(this.props.verb.conj){
            //DONE: first it gets a verb then checks whether is has this tense
            //select the object with time === time in state
            // console.log('Tenses:', this.props.times);
            var rollTense;
            var obj;
            if(!this.props.time){
                rollTense = Math.floor(Math.random() * this.props.times.length);
                obj = this.props.verb.conj.filter((item) => {
                    return item.time === this.props.times[rollTense].time;
                });
            } else {
                rollTense = Math.floor(Math.random() * this.props.time.length);
                obj = this.props.verb.conj.filter((item) => {
                    return item.time === this.props.time[rollTense];
                });
            }
            //   var rollTense = Math.floor(Math.random() * this.props.time.length);
            //    const obj = this.props.verb.conj.filter((item) => {
            //         return item.time === this.props.time[rollTense];
            //     });
           
            this.picked = obj[0][picked];
            this.tense = obj[0].time;
            return ( //({ obj[0][picked] }) 
                <div className="input-person">
                     { picked } 
                </div>
            );
        }
    }
    checkAnswer(){
       if(this.answer && this.picked) {
           if(this.answer === this.picked){
            //    this.setState({ answer: undefined });
               this.answer = null;
            //    this.props.fetchVerb(this.props.time);
                if(!this.props.time){
                    this.props.fetchVerb(this.props.times);
                } else {
                    this.props.fetchVerb(this.props.time);
                }
           }
       } 
    }
    inputAnswer(answer){
        this.answer = answer;
        this.checkAnswer();
    }
    displayDiv(){
        if(!this.props.verb.meaning){
            return (
                <div>Please wait</div>
            );
        }
    }
    handleRefresh(){
        // console.log('handling refresh icon..');
        // console.log(this.props.time);
        // console.log(this.props.times);
        if(!this.props.time){
            //  console.log('xD');
            this.props.fetchVerb(this.props.times);
        } else {
            this.props.fetchVerb(this.props.time);
        }
    }
    render(){
        console.log('OPEN', this.props.open);
        //  + (this.props.push ? 'app-push' : '')
        return (
            <div className={"verb-container "}>
                <div className="verb-inner">
                {this.displayDiv()}
                <span className="refresh-icon"><i className="fal fa-redo" onClick={this.handleRefresh.bind(this)}></i></span>
                <span className="verb-inner-meaning">{this.props.verb.meaning}</span>
                <div className={"input-field"}>
                    {this.pickRandomPerson()}
                    <InputVerb picked={this.picked} onAnswerChange={this.inputAnswer.bind(this)}  />
                </div>  
                <div className="display-tense">{this.tense}</div>  
                 <DisplayAnswer picked={this.picked} answer={this.answer} /> 
                 </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { 
     verb: state.verb,
     time: state.time,
     times: state.times,
    //  push: state.pushContent
    };
}

export default connect(mapStateToProps, { fetchVerb })(CorrectVerb);