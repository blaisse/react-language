import React, { Component } from 'react';
import CorrectVerb from './correct_verb';
import { connect } from 'react-redux';
import { pushContent } from './../actions'; 
import DisplayNoun from './display_noun';


class VerbContainer extends Component {
    displayContainer(){
        if(this.props.location.pathname === '/verb'){
            return <CorrectVerb open={this.props.push} />;
        } else if(this.props.location.pathname === '/noun'){
            return <DisplayNoun open={this.props.push} />;
        }
    }
    render(){
        // console.log('Params:', this.props.location.pathname);
        return (
            <div className={"push-container " + (this.props.push ? 'app-push' : '')}>
                {this.displayContainer()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return { 
     push: state.pushContent,
     expanded: state.auth.expanded
    };
}

export default connect(mapStateToProps, { pushContent })(VerbContainer);
