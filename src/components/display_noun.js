import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNoun } from './../actions';
import InputNoun from './input_noun';
import HandleSpecial from './hoc_special';


class DisplayNoun extends Component {
    constructor(props){
        super(props);
        this.default_language = 'german';
        this.state = { correct: "3" };
    }
    componentWillMount(){
        if(this.props.lang){
            this.default_language = this.props.lang;
        }
        this.props.fetchNoun(this.default_language);
    }
    handleNoun(article, word, inpt){
        if(word === this.props.noun.word && article === this.props.noun.article){
            this.setState({ correct: "1" }, () => {
                
            });
            setTimeout(() => {
                // async function huh(){
                //     console.log('async', this);
                //     await 
                    
                // }
                this.props.fetchNoun(this.default_language);
                this.setState({ correct: "3" });
                
            }, 1000);
            
            // this.setState({ correct: "3" });
            // console.log('ALL GOOD');
        } else {
            // console.log('wrong');
            this.setState({ correct: "2" }, () => {

            });
        }
    }
    displayContent(){
        if(!this.props.noun){
            return (
                <div>Please wait..</div>
            );
        } else {
            const Compund = HandleSpecial(InputNoun);
            return (
                <div className="noun-content">
                    <div className="noun-meaning">{this.props.noun.meaning}</div>
                    <Compund sendInput={this.handleNoun.bind(this)} correct={this.state.correct} />
                    {/* <InputNoun sendInput={this.handleNoun.bind(this)} /> */}
                </div>
            );
        }
    }
    render(){
        // console.log('props noun', this.props.noun);
        return (
            <div className="verb-container">
                {this.displayContent()}
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        lang: state.lang,
        noun: state.noun
    };
}

export default connect(mapStateToProps, { fetchNoun })(DisplayNoun);