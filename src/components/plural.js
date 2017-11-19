import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPlural } from './../actions';
import PluralInput from './plural_input';
import SpecialCharacters from './special_characters';
import HandleSpecial from './hoc_special';


class Plural extends Component {
    componentWillMount(){
        let l;
        if(!this.props.lang){
            l = 'german';
        } else {
            l = this.props.lang;
        }
        this.props.fetchPlural(l);
    }
    displayPlural(){
        if(!this.props.plural){
            return (
                <div className="loader"></div>
            );
        } else {
            const Composed = HandleSpecial(PluralInput);            
            const noun = this.props.plural;
            return (
                <div className="plural-inner">
                    <div className="plural-header">
                        <div className="plural-noun">{noun.article} {noun.word}</div>
                        <div>{noun.meaning}</div>
                    </div>
                    <Composed handleCorrect={this.handleCorrect.bind(this)} correct={this.props.plural.plural} />
                    {/* <div>{noun.plural}</div> */}
                </div>
            );
        }
    }
    handleCorrect(value){
        setTimeout(() => {
            this.props.fetchPlural((this.props.lang || 'german'));
        }, 400);
    }
    render(){
        // console.log(this.props.plural);
        return (
            <div className="plural">
                {this.displayPlural()}
            </div>
        );
    } 
}

function mapStateToProps(state){
    return {
        lang: state.lang,
        plural: state.plural
    };
}

export default connect(mapStateToProps, { fetchPlural })(Plural);