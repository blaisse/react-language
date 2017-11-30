import React, { Component } from 'react';

class SentenceBlockAnswer extends Component {
    constructor(props){
        super(props);
        this.state = { value: [] };
    }
    displayAnswer(){
        if(this.props.currentAnswer.length > 0){
            return this.props.currentAnswer.map((word, index) => {
                return (
                    <div className="sentence-block-mixed less-padding" key={index}>{word}</div>
                );
            });
        }
    }
    render(){
        // console.log('current', this.props.currentAnswer);
        return (
            <div 
                className={"sentence-block-mixed-container "
                 + (this.props.correct ? 'sentence-block-correct' : '')
                 + (this.props.incorrect ? 'sentence-block-incorrect': '') }>
                 {this.displayAnswer()}
            </div>
        );
    }
}

export default SentenceBlockAnswer;