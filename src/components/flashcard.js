import React, { Component } from 'react';
import InputFlashcard from './input_flashcard';
import HandleSpecial from './hoc_special';
// import { connect } from 'react-redux';

class Flashcard extends Component {
    constructor(props){
        super(props);
        this.state = { hovered: false, showAnswer: false, correct: false };
    }
    // shouldComponentUpdate(nextProps){
    //     return this.props.flash === nextProps.flash;
    // }
    handleGuess(guess){
        // console.log('handled!', guess, this.props.article, this.props.word);
        const answer = `${this.props.article} ${this.props.word}`;
        if(guess === answer){
            this.setState({ hovered: false, showAnswer: false, correct: true }, () => {
                //make parent know about it
                this.props.cor(this);
            });
        }
    }
    showInput(){
        if(this.state.hovered){
            const Composed = HandleSpecial(InputFlashcard);
            return (
                <div className="hello"
                     onMouseLeave={() => this.hoverStateOff()}
                     onClick={() => this.handleImgClick()}
                     >
                     <div>
                         {/* <input type="text" autoFocus={true} />  */}
                          {/* <InputFlashcard handleGuess={this.handleGuess.bind(this)} />   */}
                          <Composed handleGuess={this.handleGuess.bind(this)} /> 
                     </div>
                </div>
            );
        }
    }
    hoverState(){
        this.setState({ hovered: true, showAnswer: false }, () => {
        });
    }
    hoverStateOff(){
        document.querySelector('.hitler').focus();
        this.setState({ hovered: false, showAnswer: false });
    }
    handleImgClick(){
        this.setState({ hovered: false, showAnswer: true }, () => {
     
        });
    }
    showAnswer(){
        if(this.state.showAnswer){
            return (
                <div className="hello hello-visible"
                onClick={() => this.hoverStateOff()}
                onMouseLeave={() => this.hoverStateOff()}>
                <p className="hello-answer">{this.props.article} {this.props.word}</p>
                </div>
            );
        }
    }
    correct(){
        if(this.state.correct){
            document.querySelector('.hitler').focus();
            return (
                <div className="hello-correct">
                    <p>Correct!</p>
                </div>
            );
        }
    }
    // onMouseLeave={() => this.hoverStateOff()} 
    render(){
        //  console.log('????', this.props.flashcards);
        return (
            <div>
                <div>
                {this.showInput()}
                {this.showAnswer()}
                {this.correct()}
                <img src={this.props.img}
                    onMouseEnter={() => this.hoverState()}
                    onClick={() => this.handleImgClick()}
                />
                </div>
                <p className="english">{this.props.english}</p>
             </div>
        );
    }
}

function mapStateToProps(state){
    return {
        flashcards: state.flashcards
    };
}

export default Flashcard;