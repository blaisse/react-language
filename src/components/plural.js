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
        this.props.fetchPlural(l, localStorage.getItem('username'));
    }
    componentWillUnmount(){
        console.log('bye plural');
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
                <div className={"app-container app-container-front push-container "
                + (this.props.push ? 'app-push' : '')  
                }>
                    <div className="plural-inner">
                        <div className="plural-header">
                            <div className="plural-noun">{noun.article} {noun.word}</div>
                            <div>{noun.meaning}</div>
                        </div>
                        <Composed handleCorrect={this.handleCorrect.bind(this)} correct={this.props.plural.plural} />
                        {/* <div>{noun.plural}</div> */}
                        <div className="hint-pluarl">Press the right keyboard arrow to see the answer</div>
                    </div>
                </div>
            );
        }
    }
    handleCorrect(value){
        setTimeout(() => {
            this.props.fetchPlural((this.props.lang || 'german'), localStorage.getItem('username'));
        }, 600);
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
        plural: state.plural,
        push: state.pushContent
    };
}

export default connect(mapStateToProps, { fetchPlural })(Plural);