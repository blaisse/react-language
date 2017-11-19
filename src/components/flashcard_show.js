import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserFlashcards, clearFlashcardSet } from './../actions'; 
import { Link } from 'react-router-dom';

class FlashcardShow extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){ 
        this.props.fetchUserFlashcards(localStorage.getItem('username'));
    }
    componentWillUnmount(){
        console.log('adios!');
        // this.props.clearFlashcardSet();
    }
    handleClick(){
        console.log('me is clicked');
    }
    displayCards(){
        // console.log('me is card',this.props.cards.cards);
        if(this.props.cards.cards){
            return this.props.cards.cards.map((card, index) => {
                return (
                    <div key={index}><Link to={`/showflashcard/${card._id}`}>{card.title}</Link></div>
                );
            });
        }
    }
    handleLoad(){
        if(!this.props.cards){
            return (
                <div>Please wait</div>
            );
        }
    }
    render(){
        // console.log(this.props.cards);
        return (
            <div className={"app-container app-container-front push-container " + (this.props.push ? 'app-push' : '')}>
                {this.handleLoad()}
                {this.displayCards()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        cards: state.userFlashcards,
        push: state.pushContent
    };
}

export default connect(mapStateToProps, { fetchUserFlashcards, clearFlashcardSet })(FlashcardShow);