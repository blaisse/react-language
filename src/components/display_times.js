import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectTime} from './../actions';
import { Link } from 'react-router-dom';
import ClickTense from './click_tense';


class DisplayTimes extends Component { 
    constructor(props){
        super(props);
        this.state = { tense: [] };
    }
    renderTimes(){//props.selectTime(tt)
        return this.props.times.map((tt) => {
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
                <div className="practice-link">
                    <Link to='/verb' onClick={() => this.props.selectTime(this.state.tense)}>Practise</Link>
                </div>
            );
        }
        //this.props.selectTime(this.state.tense)
    }
    render(){
        console.log('HOME push', this.props.pushContent);
        // console.log(this.state.tense);
        return (
            // <div className="app-container">
            <div className={"app-container " + (this.props.pushContent ? 'app-push' : '')}>
                <h4>Select the tense you want to practise</h4>
                {/* <p>Only present tenses for now</p> */}
                <ul className="tense-ul">
                    <li className="tense-link-li">
                        <Link className="tense-link-li" to='/verb'>
                            <div className="tense-link all-tenses">all of them</div>
                        </Link>
                    </li>
                    {this.renderTimes()}
                </ul>
                {this.handleLink()}
                {/* <Link to='/' onClick={this.handleLink.bind(this)}>Practise</Link> */}
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        times: state.times,
        pushContent: state.pushContent
    };
}

export default connect(mapStateToProps, { selectTime })(DisplayTimes);