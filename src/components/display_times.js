import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectTime} from './../actions';
import { Link } from 'react-router-dom';


class DisplayTimes extends Component {
    renderTimes(){
        return this.props.times.map((tt) => {
            return (
                <li
                 className="tense-link"
                 key={tt.time}
                 onClick={() => this.props.selectTime(tt)}>
                   <Link to="/verb" >{tt.time}</Link>
                </li>
            );
        });
    }
    render(){
        return (
            <div className="app-container">
                <h4>Select the tense you want to practise</h4>
                <p>Only present tenses for now</p>
                <ul>
                    {this.renderTimes()}
                </ul>
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        times: state.times
    };
}

export default connect(mapStateToProps, { selectTime })(DisplayTimes);