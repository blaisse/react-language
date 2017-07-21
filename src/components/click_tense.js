import React, { Component } from 'react';

class ClickTense extends Component {
    constructor(props){
        super(props);
        this.state = { clicked: false };
    }
    handleClick(){
        if(this.state.clicked) {
            this.setState({ clicked: false }, () => {
                this.props.sendState(this.state.clicked, this.props.tense);
            });
            
        } else {
            this.setState({ clicked: true }, () => {
                this.props.sendState(this.state.clicked, this.props.tense);
            });
            
        }
    }
    render(){
        return (
            <div
            onClick={this.handleClick.bind(this)} 
            className={"tense-link " + (this.state.clicked ? 'tense-clicked' : '') }>
                  {this.props.tense}  
            </div>
        );
    }
}

export default ClickTense;