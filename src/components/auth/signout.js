import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from './../../actions';

class SignOut extends Component {
    componentWillMount(){
        this.props.signoutUser();
    }
    render(){
        return (
            <div>You have been signed out.</div>
        );
    }
}

export default connect(null, { signoutUser })(SignOut);
