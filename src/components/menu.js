import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                <Link to="/">Home</Link>
                <Link to="/add">Add Verb</Link>
                <Link to="/">Home</Link>
                <div className=" menu-bar-icon"><i className="fal fa-bars" onClick={ this.handleClick.bind(this) }></i></div>
                 {/* {this.showMenu()}  */}
                 <RightMenu open={this.state.open} />
            </div>
        );
    }
}

// export default Menu;
export default connect(null, { pushContent })(Menu);