import React, { Component } from 'react';

class FlashcardTitle extends Component {
    constructor(props){
        super(props);
        this.state = { title: "" };
    }
    handleChange(event){
        this.setState({ title: event.target.value }, () => {
            this.props.sendTitle(this.state.title);
        });
    }
    render(){
        return (
            <div>
                {/* <form onSubmit={this.handleSubmit}> */}
                    <input type="text" value={this.state.title} placeholder="Title.." onChange={this.handleChange.bind(this)} />
                {/* </form> */}
            </div>
        );
    }
}

export default FlashcardTitle; 