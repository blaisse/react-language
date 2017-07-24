import React, { Component } from 'react';
import CorrectVerb from './correct_verb';
import { connect } from 'react-redux';
import { pushContent } from './../actions'; 

class VerbContainer extends Component {
    render(){
        // console.log('Push Props Parent component', this.props.push);
        return (
            <div className={"push-container " + (this.props.push ? 'app-push' : '')}>
                <CorrectVerb open={this.props.push} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return { 
     push: state.pushContent
    };
}

export default connect(mapStateToProps, { pushContent })(VerbContainer);
