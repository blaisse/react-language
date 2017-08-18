import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import ChatInput from './chat_input';
import ChatMessages from './chat_messages';
import { expandChat, hideChat } from './../../actions';


class ChatApp extends Component {
    constructor(props){
        super(props);//{ 'German': [], 'French': [] }
        this.state = { room: 'German', users: [], messages: [], sign: false };
        // this.socket = io('http://localhost:3007');
        this.socket = io('https://safe-badlands-67690.herokuapp.com');
    }
    // shouldComponentUpdate(nextProps){
    //     // return this.props.expanded !== nextProps.expanded;
    //     // return this.props.authenticated === nextProps.authenticated
    // }
    componentDidMount(){
        // console.log('?????',this.props.auth);
        if(this.props.authenticated){
            // const socket = io('http://localhost:3007');
            const app = this;
            this.socket.on('connect', function(){
                const params = {
                    room: app.state.room,
                    username: localStorage.getItem('username')
                };
                console.log('client connect', app.state);
                app.socket.emit('join', params, (err) => {
                    if(err){
                        console.log('err', err);
                    } else {
                        console.log('no error!'); 
                    }
                });
            });
            this.socket.on('updateUsers', function(users){
                console.log('update users!', users);
                // const u = app.state.users;
                // u.push(users);
                console.log('??? og om gom', app);
                app.setState({ ...app.state, users });
            });
            this.socket.on('newMessage', function(message){
                // console.log('message from server', message);
                const x = app.state.messages;
                 x.push(message);
                // const x = app.state.messages;
                // const y = x[app.state.room];
                // y.push(message);
                app.setState({ ...app.state, messages: x });
            });
        } else {
            console.log('sign in idiot');
            this.setState({ ...this.state, sign: true });
            
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.authenticated){
            // console.log('very next props ahhh');
            this.setState({ ...this.state, sign: false }, () => {
                // console.log('HELLOO');
            });
            
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.authenticated){
            if(prevProps.authenticated && !this.props.authenticated){
                // console.log('noooooo!');
                // this.socket.disconnect();
                // const app = this;
                // this.socket.on('updateUsers', function(users){
                // console.log('update users!', users);
                // // const u = app.state.users;
                // // u.push(users);
                // app.setState({ ...app.state, users });
            // });
            } else if(prevProps.authenticated && this.props.authenticated){
                // console.log('noooooo!');
                // this.socket.connect();
            }
        }
    }
    handleSocket(){
        console.log('WOWOWOWOWOWOW');
        const app = this;
        const params = {
            room: 'German',
            username: localStorage.getItem('username')
        };
        console.log('PPPP', params);
        this.socket.emit('joinGerman', params, (err) => {
            if(err){
                console.log('err');
            } else {
                console.log('all German good');
            }
        });
        // this.setState({ ...this.state, room: 'German', messages: [] });
        this.socket.on('updateUsers', function(users){
            console.log('update users!', users);
            // const u = app.state.users;
            // u.push(users);
            app.setState({ ...app.state, users });
        });
        this.socket.on('newMessage', function(message){
            // console.log('message from server', message);
            const x = app.state.messages;
            x.push(message);
            // const x = app.state.messages;
            // const y = x[app.state.room];
            // y.push(message);
            app.setState({ ...app.state, messages: x });
        });
    }
    // componentDidUpdate(){
    //     console.log('props inc inc ');
    //     if(this.props.authenticated){
    //         console.log('auth AT LAST');
    //         // this.setState({ ...this.state, sign: false });
    //     }
    // }
    handleGerman(){
        const params = {
            room: 'German',
            username: localStorage.getItem('username')
        };
        this.socket.emit('joinGerman', params, (err) => {
            if(err){
                console.log('err');
            } else {
                console.log('all German good');
            }
        });
        this.setState({ ...this.state, room: 'German', messages: [] });
    }
    handleFrench(){
        const params = {
            room: 'French',
            username: localStorage.getItem('username')
        };
        this.socket.emit('joinFrench', params, (err) => {
            if(err){
                console.log('??????----',err);
            } else {
                console.log('all good French');
            }

        });
        this.setState({ ...this.state, room: 'French', messages: [] });
    }
    renderRooms(){
        // const rooms = ['French', 'German'];
        if(this.state.room === 'German'){
            return [
                <div key="1" className="chat-room chat-room-joined">German</div>,
                <div key="2" className="chat-room" onClick={this.handleFrench.bind(this)}>French</div>    
            ];
        }
        if(this.state.room === 'French'){
            return [
                <div key="1" className="chat-room" onClick={this.handleGerman.bind(this)}>German</div>,
                <div key="2" className="chat-room chat-room-joined">French</div>    
            ];
        }

    }
    renderUsers(){
        return this.state.users.map((user) => {
            return (
                <div key={user}>{user}</div>
            );
        });
    }
    renderSign(){
        // if(this.state.sign){
        if(!this.props.authenticated){
            this.socket.disconnect();
            // this.setState({ ...this.state, messages: [] });
        return (
            <div>Sign In FOOL</div>
        );
        } else {
            this.socket.connect();
            return [
                <div key="1" className="chat-container-left">
                    <div className="chat-container-left-rooms">
                        {this.renderRooms()}
                    </div>
                    <div className="chat-container-left-users">
                        <p>Signed in:</p>
                        {this.renderUsers()}
                    </div>
                </div>,
                <div key="2" className="chat-container-right">
                    <ChatMessages socket={this.socket} messages={this.state.messages} />
                    <ChatInput socket={this.socket} />
                </div>
            ];
        }
    }
    render(){
        // console.log('?', this.props.auth);
        return (
            <div className="chat-container">
                {this.renderSign()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        authenticated: state.auth.authenticated,
        expanded: state.chat.expanded
    };
}

export default connect(mapStateToProps, { hideChat })(ChatApp);
