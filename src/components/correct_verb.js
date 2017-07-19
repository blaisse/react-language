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
    }
    componentDidMount(){
        this.props.fetchVerb();
    }
    pickRandomPerson(){
        const p = ['ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'];
        var picked = p[Math.floor(Math.random()*6)];
        if(this.props.verb.conj){
            //select the object with time === time in state
            const obj = this.props.verb.conj.filter((item) => {
                return item.time === this.props.time.time;
            });
            this.picked = obj[0][picked];
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
               this.props.fetchVerb();
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
    render(){
        return (
            <div className="verb-container">
                <div className="verb-inner">
                {this.displayDiv()}
                <span className="verb-inner-meaning">{this.props.verb.meaning}</span>
                <div className={"input-field"}>
                    {this.pickRandomPerson()}
                    <InputVerb picked={this.picked} onAnswerChange={this.inputAnswer.bind(this)}  />
                </div>       
                 <DisplayAnswer picked={this.picked} answer={this.answer} /> 
                 </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { 
     verb: state.verb,
     time: state.time
    };
}

export default connect(mapStateToProps, { fetchVerb })(CorrectVerb);