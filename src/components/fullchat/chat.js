import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props){
        super(props);
        this.socket = io('http://localhost:3007');
    }
}