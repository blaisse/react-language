import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlashcard } from './../actions';
import Flashcard from './flashcard';
import HandleSpecial from './hoc_special';

class FlashcardsGrid extends Component {
    constructor(props){
        super(props);
        this.state = { allCorrect: 0, correct: [] };
        this.size = 10;
        
    }
    // shouldComponentUpdate(nextProps){
    //     return this.props.push === nextProps.push; 
    // }
    componentDidMount(){
        // console.log('?_?_?', window.scrollTop);
        // let fired = 0;
        // window.addEventListener('scroll', () => {
        //     // console.log(';xxxx', window.scrollY);
        //     let scrolled = window.scrollY;//amount scrolled from the very top
        //     let grid_height = document.querySelector('.flashcards-grid').scrollHeight;//total height of the gird
        //     let window_height = window.innerHeight;//always the same..actual browser window height
        //     // console.log('let', document.querySelector('.flashcards-grid').clientHeight, x);
        //     if(scrolled+window_height >= grid_height + 100){//onces it's almost at the end of the div
        //         // console.log('zzzzzzzz', this.state);
        //         if(fired === 0) this.setState({ loading: true, load: false, fired: 1 });
        //         fired++;
        //     }
        // });
    }
    componentWillMount(){
        let l = this.props.lang;
        if(l === null) l = 'german'; //change to german once some images for german nouns are added
        this.props.fetchFlashcard(l);
    }
    componentWillUpdate(){
 
    }
    componentDidUpdate(){

    }
    componentWillReceiveProps(nextProps){
       
    }
    displayFlashcards(){
        if(this.props.flashcards){
            console.log('flash', this.props.flashcards);
            return this.props.flashcards.map((item) => {
            //  return lol.map((item) => {
                const Composed = HandleSpecial(Flashcard);
                // let uq = Date.now();Math.random().toString(36).substr(2, 10)
                return (
                    <div className="flashcards-item" key={item.img}>
                        {/* <Composed img={item.img} english={item.meaning} article={item.article} word={item.word} /> */}
                          <Flashcard all={this.state.allCorrect} img={item.img} english={item.meaning} article={item.article} word={item.word} cor={this.handleCorrect.bind(this)} />  
                    </div>
                );
            }); 
            // return this.props.flashcards.map((set) => {
            //    const Composed = HandleSpecial(Flashcard);
            //    return set.map((item) => {
            //         // console.log('item', item);
            //     return (
            //         <div className="flashcards-item" key={Math.random().toString(36).substr(2, 10)}>
            //             {/* <Composed img={item.img} english={item.meaning} article={item.article} word={item.word} /> */}
            //               <Flashcard all={this.state.allCorrect} img={item.img} english={item.meaning} article={item.article} word={item.word} cor={this.handleCorrect.bind(this)} />  
            //         </div>
            //     );
            //     });
            // });
        }
    }
    handleCorrect(card){
        // console.log('card', card);
        let q = this.state.allCorrect;
        q++;
        let b = this.state.correct;
        b.push(card);
        // card.setState({ hovered: false, showAnswer: false, correct: true });
        this.setState({ allCorrect: q, correct: b}, () => {
            if(this.state.allCorrect === this.size){
            this.state.correct.forEach((item) => {
                setTimeout(() => item.setState({ hovered: false, showAnswer: false, correct: false }), 300);
            });
            let l = this.props.lang;
            if(l === null) l = 'german';
              this.props.fetchFlashcard(l);
            }
        });
        
    }
    displayMore(){//no use
         if(this.state.loading){
            // console.log('fcards', document.querySelector('.flashcards-grid'));     
            return this.props.flashcards.map((item) => {
                const Composed = HandleSpecial(Flashcard);
                return (
                    <div className="flashcards-item" key={item.img}>
                        {/* <Composed img={item.img} english={item.meaning} article={item.article} word={item.word} /> */}
                          <Flashcard img={item.img} english={item.meaning} article={item.article} word={item.word} />  
                    </div>
                );
            }); 
        }
    }
    handleLoading(){//no use
        if(this.state.loading){
            return (
                <div>Loading..</div>
            );
        }
    }
    handleLoadClick(){
        let l = this.props.lang;
        if(l === null) l = 'german';
        this.props.fetchFlashcard(l);
    }
    render(){
        return (
            <div className={"push-container " + (this.props.push ? 'app-push' : '')}>
                <div className="app-container app-container-front">
                    <p className="flashcards-p">Hover over the card to type your guess, click to check the answer.</p>
                    <div className="flashcards-grid">
                        {this.displayFlashcards()} 
                        {/* {this.displayMore()}     */}
                    </div>
                    {/* {this.handleLoading()} */}
                    {/* <p onClick={this.handleLoadClick.bind(this)}>Load more</p> */}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        flashcards: state.flashcards,
        lang: state.lang,
        push: state.pushContent
    };
}

export default connect(mapStateToProps, { fetchFlashcard })(FlashcardsGrid);