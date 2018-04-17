import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNoun, resetNoun, setLastCorrect, userFetchNoun } from './../actions';
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
        if(this.props.auth){
            console.log('noun auth. goo');
            this.props.userFetchNoun(this.default_language);
        } else {
            this.props.fetchNoun(this.default_language);
        }
        
    }
    componentWillUnmount(){
        // console.log('unmounting..');
        this.props.resetNoun();
        // console.log(this.props.noun);
    }
    handleNoun(article, word, inpt){
        // console.log('wtf?', ar);
        if(word === this.props.noun.word && article === this.props.noun.article){
            if(this.props.auth){
                this.props.setLastCorrect('noun', word);
            }
            this.setState({ correct: "1" }, () => {
                
            });
            setTimeout(() => {
                if(this.props.auth){
                    this.props.userFetchNoun(this.default_language);
                } else {
                    this.props.fetchNoun(this.default_language);
                }  
                this.setState({ correct: "3" });
            }, 400);
            
        } else {
            // console.log('wrong');
            this.setState({ correct: "2" }, () => {
                setTimeout(() => {
                    this.setState({ correct: "3" });
                }, 500);
            });
        }
    }
    clearClass(){ 
        // console.log('clearning class..');
        // if(this.state.correct !== "3"){
        //     this.setState({ correct: "4" });
        // }
    }
    displayContent(){
        if(!this.props.noun){
            return (
                <div className="loader"></div>
            );
        } else {
            const Compund = HandleSpecial(InputNoun);
            return (
                <div className="noun-content">
                    <div className="noun-meaning">{this.props.noun.meaning}</div>
                    <Compund sendInput={this.handleNoun.bind(this)} correct={this.state.correct} clearClass={this.clearClass.bind(this)} />
                    {/* <InputNoun sendInput={this.handleNoun.bind(this)} /> */}
                </div> 
            );
        }
    }
    render(){
        console.log('props noun', this.props.noun);
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
        noun: state.noun,
        auth: state.auth.authenticated
    };
}

export default connect(mapStateToProps, { fetchNoun, resetNoun, setLastCorrect, userFetchNoun })(DisplayNoun);