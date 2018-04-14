import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVerb, selectTime, resetVerb, setLastCorrect } from './../actions';
import InputVerb from './input_verb';
import DisplayAnswer from './display_answer';
import _ from 'lodash';
import classNames from 'classnames';
import HandleSpecial from './hoc_special';


class CorrectVerb extends Component {
    constructor(props){
        super(props);
        this.answer = null;
        this.picked = null;
        this.tense = null;
        this.defaultLang = 'german';
    }
    shouldComponentUpdate(nextProps){
        if(nextProps.open){
           return this.props.open === nextProps.open;  
        }
        if(this.props.open){
            return this.props.open === nextProps.open;
        }
        if(nextProps.expanded){
            return this.props.expanded === nextProps.expanded;
        }
        if(this.props.expanded){
            return this.props.expanded === nextProps.expanded;
        }
        return this.props.expanded === nextProps.expanded;
        // return this.props.open === nextProps.open; 
    }
    componentWillMount(){
        if(!this.props.lang){
        } else {
            this.defaultLang = this.props.lang;
        }
        // console.log(this.defaultLang);
        if(!this.props.time){
            if(this.defaultLang === 'french'){
                this.props.fetchVerb(this.props.french_tenses, this.defaultLang, localStorage.getItem('username'));
            } else {
                this.props.fetchVerb(this.props.times, this.defaultLang, localStorage.getItem('username'));
            }
            
        } else {
            this.props.fetchVerb(this.props.time, this.defaultLang, localStorage.getItem('username'));
        }
    }
    componentDidMount(){  
        console.log('qqqqq', this.props.verb);
    }
    componentWillUnmount(){
        this.props.resetVerb();
    }
    pickRandomPerson(){
        let p = ['ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'];
        // console.log('???',this.props.verb);
        var picked = p[Math.floor(Math.random()*6)];
        if(this.props.verb.conj){
            //DONE: first it gets a verb then checks whether is has this tense
            //select the object with time === time in state
            var rollTense;
            var obj;
            if(!this.props.time){
                if(this.defaultLang === 'french'){
                    rollTense = Math.floor(Math.random() * this.props.french_tenses.length);
                    obj = this.props.verb.conj.filter((item) => {
                        return item.time === this.props.french_tenses[rollTense].time;
                    });
                    if(obj.length===0)console.log('!props.time - 00');
                } else {
                    rollTense = Math.floor(Math.random() * this.props.times.length);
                    obj = this.props.verb.conj.filter((item) => {
                        return item.time === this.props.times[rollTense].time;
                    });
                    if(obj.length===0)console.log('!props.time - 00');
                }
              
            } else {
                //if(this.anyTense.length === 1){
                    //SET global props.time to all times possible
                    // let allTenses = this.props.times.map((item) => {
                    //     return item.time;
                    // });
                    // console.log(allTenses);
                    // this.props.selectTime(allTenses);

                    // rollTense = Math.floor(Math.random() * this.props.times.length);
                    // obj = this.props.verb.conj.filter((item) => {
                    //     return item.time === this.props.times[rollTense].time;
                    // });
                    // if(obj.length===0)console.log('!props.time - 111');
                //} else {

                    //if time length === 1 it still rolls even though there's no need -not the problem cus its
                    //always 0 - the first element
                    rollTense = Math.floor(Math.random() * this.props.time.length);
                    obj = this.props.verb.conj.filter((item) => {
                        return item.time === this.props.time[rollTense];
                    });
                    if(obj.length===0)console.log('LOL?', rollTense);
                    // console.log('LOL verb', this.props.verb);
               // }
            }
           
            this.picked = obj[0][picked];
            this.tense = obj[0].time;
            let french_substitute = picked;
            //only 2 german fields need altering
            if(french_substitute === 'er_sie_es') french_substitute = 'er, sie, es';
            if(french_substitute === 'sie_Sie') french_substitute = 'sie, Sie';
            //change german to french just visually
            if(this.props.lang === 'french'){
                if(picked === 'ich') french_substitute = 'je';
                if(picked === 'du') french_substitute = 'tu';
                if(picked === 'er_sie_es') french_substitute = 'il, elle';
                if(picked === 'wir') french_substitute = 'nous';
                if(picked === 'ihr') french_substitute = 'vous';
                if(picked === 'sie_Sie') french_substitute = 'ils, elles';
            }
            this.substitute = french_substitute;
            // return (
            //     <div className="input-person">
            //          { french_substitute } 
            //     </div>
            // );
        }
    }
    displaySub(){
        return (
            <div className="input-person">
                    { this.substitute } 
            </div>
        );
    }
    checkAnswer(){
        // console.log('qweqweqw', this.answer, this.picked);
       if(this.answer && this.picked) {
           if(this.answer === this.picked){
                this.answer = null;
    
                //this might not be working on a real server 100ms delay

                // if(this.props.auth){
                //     setTimeout(() => {
                //         this.props.setLastCorrect('verb', this.props.verb.word);
                //     }, 200);
                // }
                // if(this.props.auth){ 
                //     this.props.setLastCorrect('verb', this.props.verb.word);
                // }
                setTimeout(() => {
                    if(!this.props.time){
                        if(this.defaultLang === 'french'){
                            this.props.fetchVerb(this.props.french_tenses, this.defaultLang, localStorage.getItem('username'));
                        } else {
                            this.props.fetchVerb(this.props.times, this.defaultLang, localStorage.getItem('username'));
                        }
                        
                    } else {
                        this.props.fetchVerb(this.props.time, this.defaultLang, localStorage.getItem('username'));
                    }
                }, 400);
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
                <div className="loader"></div>
            );
        }
    }
    handleRefresh(){
        if(!this.props.time){
            if(this.defaultLang === 'french'){
                this.props.fetchVerb(this.props.french_tenses, this.defaultLang, localStorage.getItem('username'));                
            } else {
                this.props.fetchVerb(this.props.times, this.defaultLang, localStorage.getItem('username'));                
            }
        } else {
            this.props.fetchVerb(this.props.time, this.defaultLang, localStorage.getItem('username'));
        }
    }
 
    render(){
        //  + (this.props.push ? 'app-push' : '')
        const Composed = HandleSpecial(InputVerb);
        this.pickRandomPerson();
        return (
            <div className={"verb-container "}>
                {this.displayDiv()}
                <div className="verb-inner">
                
                <span className="refresh-icon"><i className="fal fa-redo" onClick={this.handleRefresh.bind(this)}></i></span>
                <span className="verb-inner-meaning">{this.props.verb.meaning} {this.tense}</span>
                {/* <span className="verb-inner-meaning">{this.tense}</span> */}
                <div className={"input-field"}>
                    {this.displaySub()}
                    {/* make it composed */}
                    {/* <InputVerb picked={this.picked} onAnswerChange={this.inputAnswer.bind(this)}  /> */}
                    <Composed picked={this.picked} onAnswerChange={this.inputAnswer.bind(this)} />
                </div>  
                {/* <div className="display-tense">{this.tense}</div>   */}
                 {/* <DisplayAnswer picked={this.picked} answer={this.answer} />  */}

                 </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { 
     verb: state.verb,
     time: state.time,
     times: state.times,//german
     french_tenses: state.french_tenses,
     lang: state.lang,
     expanded: state.chat.expanded,
     auth: state.auth.authenticated
    //  push: state.pushContent
    };
}

export default connect(mapStateToProps, { fetchVerb, selectTime, resetVerb, setLastCorrect })(CorrectVerb);