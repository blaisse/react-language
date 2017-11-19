import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import RightMenu from './right_menu';
import { connect } from 'react-redux';
import { pushContent } from './../actions';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = { open: false };
    }
    showMenu(){
        if(this.state.open){
            return (
                <div>
                    <RightMenu open={this.state.open} />
                </div>
            );
        } else {
            return ( <div></div> );
        }
    }
    handleClick(){
        if(this.state.open){
            this.setState({ open: false }, () => {
                this.props.pushContent(this.state.open);
            });
        } else {
            this.setState({ open: true }, () => {
                this.props.pushContent(this.state.open);
            });
        }
    }
    handleKey(){
        console.log('esc pressed!');
    }
    renderSign(){
        if(this.props.authenticated){
            return (
                <div className="menu-container-out"><Link to="/signout">Sign Out</Link></div>
            );
        } else {
            return (
                <div className="menu-container-out">
                    <Link to="signin" key="1">Sign In</Link>
                    <Link to="signup" key="2">Sign Up</Link>
                </div>
            );
            // return [
            //     <Link to="signin" key="1">Sign In</Link>,
            //     <Link to="signup" key="2">Sign Up</Link>
            // ];
        }
    }
    render(){
        return (
            <div className="menu-container">
                {/* <Link to="/">Home</Link> */}
                <div className="menu-container-logo"><span><strong>French & German</strong></span></div>
                <div className="menu-container-links">
                <Link exact to="/">Change language</Link>
                <Link to="/tenses">Tenses</Link>
                <Link to="/noun">Practise Nouns</Link>
                <Link to="flashcards">Flashcards</Link>
                <Link to="/plural">Plural</Link>
                <Link to="/blocks">Blocks</Link>
                </div>
                {this.renderSign()}
                <div className={"menu-icon " + (this.props.push ? 'menu-icon-close' : '')} onClick={ this.handleClick.bind(this) }><div className="menu-icon-middle"></div></div>
                {/* <div className=" menu-bar-icon"><i className="fal fa-bars" onClick={ this.handleClick.bind(this) }></i></div> */}
                 {/* {this.showMenu()}  */}
                 <RightMenu open={this.state.open} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return { 
     verb: state.verb,
     time: state.time,
     times: state.times,
     push: state.pushContent,
     authenticated: state.auth.authenticated
    };
}

// export default Menu;
export default connect(mapStateToProps, { pushContent })(Menu);