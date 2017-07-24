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
    render(){
        return (
            <div className="menu-container">
                {/* <Link to="/">Home</Link> */}
                <Link exact to="/">Change language</Link>
                <Link to="/tenses">Tenses</Link>
                <Link to="/add">Add Verb</Link> 
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
     push: state.pushContent
    };
}

// export default Menu;
export default connect(mapStateToProps, { pushContent })(Menu);