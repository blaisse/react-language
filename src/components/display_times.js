import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectTime, setUrl} from './../actions';
import { Link } from 'react-router-dom';
import ClickTense from './click_tense';


class DisplayTimes extends Component { 
    constructor(props){
        super(props);
        this.state = { tense: [] };
    }
    componentWillUnmount(){
        console.log('unmount tenses');
        this.props.setUrl(window.location.href.slice(window.location.href.length-4));
    }
    componentDidMount(){
        // console.log('me mounted', this.props.time);
        // console.log('current verb - display', this.props.verb);
    }
    renderTimes(){//props.selectTime(tt)
        let properTenses;
        if(this.props.lang === "german"){
            properTenses = this.props.times;
        } else if(this.props.lang === "french"){
            properTenses = this.props.french_tenses;
        } else {
            properTenses = this.props.times;//default to german tenses
        }
        // console.log('tenses based on language', properTenses);
        return properTenses.map((tt) => {
            return (
                <li
                  className="tense-link-li"
                 key={tt.time}
                 //onClick={() => this.setState({ tense: [...this.state.tense, tt.time] })}
                 > 
                   {/* <Link to="/verb" >{tt.time}</Link> */}
                   <ClickTense tense={tt.time} sendState={this.checkClick.bind(this)} />
                </li>
            );
        });
    }
    checkClick(st, tense){ 
        if(st){
            this.setState({ tense: [ ...this.state.tense, tense ] }, () => {
                // console.log(this.state.tense);
            });
        } else {
            const x = this.state.tense;
            const newX = x.filter((item) => {
                return item !== tense;
            });
            this.setState({ tense: newX }, () => {
                // console.log(this.state.tense);
            });
            // console.log('newX', newX);
        }
    }
    handleLink(){
        if(this.state.tense.length === 0){
            return (
                <div>Please select at least one tense</div>
            );
        } else {
            return (
                <div className="practice-link" onClick={() => this.props.selectTime(this.state.tense)}>
                    <Link to='/verb'>Click to Practise</Link>
                </div>
            );
        }
        //this.props.selectTime(this.state.tense)
    }
    render(){
        // console.log(this.props.french_tenses);
        // console.log('Read global state', this.props);
        // console.log('HOME push', this.props.pushContent);
        return (
            // // <div className={"app-container " + (this.props.pushContent ? 'app-push' : '')}>
            <div className={"push-container move-in " + (this.props.push ? 'app-push' : '')}>
                <div className="stretch"> 
            <div className="app-container">
                <h4>Select the tense you want to practise</h4>
                {/* <p>Only present tenses for now</p> */}
                <ul className="tense-ul">
                    <li className="tense-link-li">
                        <Link className="tense-link-li" to='/verb' onClick={() => {
                            if(this.props.lang === 'french'){
                                this.props.selectTime(this.props.french_tenses);
                            } else {
                                this.props.selectTime(this.props.times);
                            }
                        }}>
                            <div className="tense-link all-tenses">all of them</div>
                        </Link>
                    </li>
                    {this.renderTimes()}
                </ul>
                {this.handleLink()}
                {/* <Link to='/' onClick={this.handleLink.bind(this)}>Practise</Link> */}
            </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        times: state.times,
        time: state.time,
        push: state.pushContent,
        lang: state.lang,
        french_tenses: state.french_tenses,
        verb: state.verb
    };
}

export default connect(mapStateToProps, { selectTime, setUrl })(DisplayTimes);