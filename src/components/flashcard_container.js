import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlashcardCreate from './flashcard_create';
import { saveFlashcardSet } from './../actions';
import FlashcardTitle from './flashcard_title_input'; 

class FlashcardContainer extends Component {
    constructor(props){
        super(props);
        this.state = { cards: {  }, sets: [{ index: 0 }] };
        this.index = 0;//will start at one
        this.title = "";
    }
    shouldComponentUpdate(nextProps){
        return this.props.push === nextProps.push; 
    }
    componentDidUpdate(){
        const div = document.querySelector('.app-container');
        window.scrollTo(0,div.scrollHeight);
    }
    // componentWillReceiveProps(){
    //     const div = document.querySelector('.app-container');
    //     window.scrollTo(0,div.scrollHeight);
    // }
    renderFlashcardPair(){
        return (
            <div>
                <FlashcardCreate index={this.index} getOutput={this.getOutput.bind(this)} />
            </div>
        );
    }
    renderPair(){
        return this.state.sets.map((item) => {
            return (
                <div key={item.index}>
                    <FlashcardCreate handleTab={this.handleTab.bind(this)} index={item.index} getOutput={this.getOutput.bind(this)} />
                </div>
            );
        });
    }
    getOutput(obj, index){
        // console.log('gibe state', index, obj);
        this.setState({ cards: { ...this.state.cards, [index]: obj }  }, () => {
            // console.log('////', this.state);
        });
    }
    handleClickAdd(){
        this.index++;
        const x = this.state.sets;
        x.push({ index: this.index });
        this.setState({ ...this.state, sets: x });
        // console.log('LUL?');
    }
    handleSave(){
        const cards = this.state.cards;
        const keys = Object.keys(cards);
        // console.log('saved', this.state.cards);
        if(!(Object.keys(cards).length === 0)){
            //Renumerate the object properties 0-2-5 to 0-1-2
            const n = {};
            let prev = 0;
            keys.forEach((key) => {
                if(cards[key] && key != prev){
                    n[prev] = cards[key];
                    prev++;
                } else if(cards[key] && key == prev){
                    n[key] = cards[key];
                    prev++;
                }
            });
            //make the object into an array and save to DB
            const ar = [];
            let qq = Object.keys(n);
            qq.forEach((item) => {
                ar.push(n[item]);
            });
            let values = {};
            values.ar = ar;
            values.owner = localStorage.getItem('username');
            values.title = this.title;
            // console.log('????');
            this.props.saveFlashcardSet(values, () => { 
                this.props.history.push('/showflashcards');
            });     
            // this.props.saveFlashcardSet(values).then(this.props.history.push('/showflashcards'));       
        }
    }
    handleTab(event){
        if(event.keyCode === 9){
            //index is stored in an html tag data-index, compare it to the length of the array
            //so that only the last one triggers tab click
            const index = Number(event.target.getAttribute('data-index')) + 1;
            if(index === this.state.sets.length){
                this.handleClickAdd();
            }
        }
    }
    getTitle(title){
        this.title = title;
    }
    render(){
        return (
            // <div className={"push-container " + (this.props.push ? 'app-push' : '')}>
                <div className="app-container app-container-front">
                    {/* {this.renderFlashcardPair()}  */}
                    <FlashcardTitle sendTitle={this.getTitle.bind(this)} />
                    {this.renderPair()}
                    <button className="flashcard-add-button" onClick={this.handleClickAdd.bind(this)}>Add a flashcard (Tab)</button>
                    <button className="flashcard-add-button" onClick={this.handleSave.bind(this)}>Save</button>
                </div>
            // </div>
        );
    }
}

function mapStateToProps(state){
    return {
        push: state.pushContent
    };
}

export default connect(mapStateToProps, { saveFlashcardSet })(FlashcardContainer);