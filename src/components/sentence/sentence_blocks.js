import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSentenceBlock, clearSentenceBlock } from './../../actions';
import SentenceBlockAnswer from './sentence_blocks_answer';

class SentenceBlocks extends Component {
    constructor(props){
        super(props);
        this.state = { answer: [], correct: false, incorrect: false, words: {} };
    }
    componentWillMount(){
        this.props.fetchSentenceBlock(this.props.lang, "1");
    }
    componentWillUnmount(){
        // console.log('me is bye');
        this.props.clearSentenceBlock();
    }
    handleBlockClick(event, word, index){
        if(this.state.answer.length <= this.props.sentenceBlock.slicedFully.length){
            // this[index].className = "sentence-block-mixed sentence-block-mixed-hide";
            let n = this.state.answer;
            n.push(word);
            let x = this.state.words;
            x[index] = word;
            // console.log('xxxx', x);
            this.setState({ answer: n, words: x }, () => {
                // console.log('i', index, this.state.words);
                if(this.state.words[index]){
                    this[index].className = "sentence-block-mixed sentence-block-mixed-hide";
                }

                if(this.state.answer.length === this.props.sentenceBlock.slicedFully.length){
                    let answer = "";
                    this.state.answer.forEach((item) => {
                        answer += item;
                    });
                    let proper = "";
                    this.props.sentenceBlock.slicedFully.forEach((item) => {
                        proper += item;
                    });
                    // console.log('answer string', answer);
                    // console.log('proper string', proper);
                    if(answer === proper){
                        this.setState({ ...this.state, correct: true }, () => {
                            setTimeout(() => {
                                const keys = Object.keys(this.state.words);
                                keys.forEach((key) => {
                                    this[key].className = "sentence-block-mixed";
                                });
                                //idk if it always works but seems great right now
                                this.props.clearSentenceBlock();
                                this.setState({ answer: [], correct: false, words: {} }, () => {
                                    this.props.fetchSentenceBlock(this.props.lang, "1");
                                });
                            }, 2000);
                        });
                    } else {
                        //incorrect - clear out but dont fetch a new one
                        this.setState({ ...this.state, incorrect: true }, () => {
                            setTimeout(() => {
                                const keys = Object.keys(this.state.words);
                                keys.forEach((key) => {
                                    this[key].className = "sentence-block-mixed";
                                });
                                this.setState({ answer: [], correct: false, incorrect: false, words: {} });
                            }, 2000);
                        });   
                    }
                }
            });
        }
    }
    updateAnswer(){

    }
    displayBlocks(){
        const blocks = this.props.sentenceBlock.mixedFully;
        if(this.props.sentenceBlock.hasOwnProperty('mixedFully')){
            return this.props.sentenceBlock.mixedFully.map((word, index) => {
                return (
                    <div ref={(div) => this[index] = div} className="sentence-block-mixed" key={index} onClick={(event) => {
                        this.handleBlockClick(event, word, index);
                    }}>
                        {word}
                    </div>
                );
            });
        }
    }
    render(){
        // console.log('pls work', this.props.sentenceBlock);        
        return (
            <div className={"app-container app-container-front push-container "
                + (this.props.push ? 'app-push' : '')  
            }>
                <SentenceBlockAnswer currentAnswer={this.state.answer} correct={this.state.correct} incorrect={this.state.incorrect} />
                <div className={"sentence-block-mixed-container"}>{this.displayBlocks()}</div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        push: state.pushContent,
        lang: state.lang,
        sentenceBlock: state.sentenceBlock
    };
}

export default connect(mapStateToProps, { fetchSentenceBlock, clearSentenceBlock })(SentenceBlocks);