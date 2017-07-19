import React, { Component } from 'react';
import { connect } from 'react-redux';

class DisplayAnswer extends Component {
    constructor(props){
        super(props);
        this.state = { clicked: false };
    }
    componentWillReceiveProps(nextProps){
        // console.log("nextProps", nextProps);
        this.setState({ clicked: false });
    }
    handleClick(){
        this.setState({ clicked: true }, () => {
            // console.log(this.state);
        });
    }
    displayProp(){
        if(!this.state.clicked){
            return (
                <span onClick={() => this.handleClick()}>Show answer</span>
            );
        }
        if(this.state.clicked){
            return (
                <span>{this.props.picked}</span>
            );
        }
    }
    render(){
        return (
            <div className="verb-hint"> 
                {this.displayProp()}
            </div>
        );
    }
}

export default DisplayAnswer;
