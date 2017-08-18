import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpecialCharacters from './special_characters';

class InputNoun extends Component {
    constructor(props) {
        super(props);

        this.state = { value: "", article: "" };
    }
    componentDidMount(){
        // document.querySelector('.verb-container').addEventListener('keypress', (event) => {
        //     console.log('aaa', event);
        // });
    }
    handleArticle(event){
        let q = event.target.value;
        // console.log('Article', event.target.value);
        this.setState({ value: this.state.value, article: q });
    }
    handleCharacterClick(id){
        // console.log(this.nameInput.value);
        let q = document.querySelector(id).textContent;
        const x = this.state.article;
        this.setState({ value: `${this.state.value}${q}`, article: x });
        this.wordInput.focus();//articles doesnt have special characters..i hope
    }
    onSubmit(event){
        event.preventDefault();
        this.props.sendInput(this.state.article, this.state.value, this.nameInput);
        this.nameInput.focus();
        this.setState({ value: "", article: "" });
        // this.forceUpdate();
    }
    displaySpecialCharacters(){
        
    }
    render(){
        // const { handleSubmit } = this.props;
        return (
            <div className="verb-container ">
                <form className="noun-form" onSubmit={this.onSubmit.bind(this)}>
                    <input className={"article-input "+(this.props.correct === "2" ? 'incorrect' : '')+(this.props.correct === "1" ? ' very-correct' : '')} ref={input => this.nameInput = input} type='text' placeholder='article..' onChange={this.handleArticle.bind(this)} value={this.state.article} autoFocus={true} />
                    <input className={(this.props.correct === "2" ? 'incorrect' : '')+(this.props.correct === "1" ? ' very-correct' : '')} ref={input => this.wordInput = input} type='text' placeholder='noun..' onChange={this.props.handleSth.bind(this)} value={this.state.value} autoFocus={false} /> 
                     {/* <input ref={input => this.wordInput = input} type='text' placeholder='noun..' onChange={this.handleChange.bind(this)} value={this.state.value} autoFocus={false} />  */}
                    <button className="hide-button">Submit</button>
                </form>
                {this.displaySpecialCharacters()}
                <SpecialCharacters handleClick={this.handleCharacterClick.bind(this)} />
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        lang: state.lang
    };
}

export default connect(mapStateToProps)(InputNoun);