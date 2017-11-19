import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){
    class HandleSpecial extends Component {
        handleAddVerb(value){
            const removed = value.slice(0, value.length-1);
            if(this.props.lang === 'german' || this.props.lang === null){
                if(value[value.length-1] === "1") return `${removed}${String.fromCodePoint(252)}`;
                if(value[value.length-1] === "2") return `${removed}${String.fromCodePoint(246)}`;
                if(value[value.length-1] === "3") return `${removed}${String.fromCodePoint(223)}`;
                if(value[value.length-1] === "4") return `${removed}${String.fromCodePoint(228)}`;
                if(value[value.length-1] === "5") return `${removed}${String.fromCodePoint(233)}`;
            } else if(this.props.lang === 'french'){
                if(value[value.length-1] === "1") return `${removed}${String.fromCodePoint(233)}`;
                if(value[value.length-1] === "2") return `${removed}${String.fromCodePoint(231)}`;
                if(value[value.length-1] === "3") return `${removed}${String.fromCodePoint(234)}`;
                if(value[value.length-1] === "4") return `${removed}${String.fromCodePoint(249)}`;
                // if(value[value.length-1] === "5") return `${removed}${String.fromCodePoint(233)}`;
            }

            return value;
        }
        handleChange(event){
            // console.log('xD', event.target.value);
            event.preventDefault();
            let q = event.target.value;
            const val = event.target.value[event.target.value.length-1];

            //Remove placeholder state so that I can make the cursor invisible
            if(this.props.plural){
               if(this.state.placeholder !== ""){
                   this.setState({ ...this.state, placeholder: "" });
               }
            }
            
            // this.props.clearClass();
            if(this.props.lang === 'french'){
                if(val === '1'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(233)}`;
                } else if(val === '2'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(231)}`;
                } else if(val === '3'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(234)}`;
                } else if(val === '4'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(249)}`;
                }
            } else if(this.props.lang === 'german' || this.props.lang === null){
                if(val === '1'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(252)}`;
                } else if(val === '2'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(246)}`;
                } else if(val === '3'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(223)}`;
                } else if(val === '4'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(228)}`;
                } else if(val === '5'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(233)}`; 
                }            
            }
            // if(place === 'flashcard'){
            //     console.log('flashhvard');
            // }
            // console.log('xDD', this);
            if(this.props.plural){
                 return this.setState({ value: q });
            } else if(this.state.flashcard === "" || this.state.flashcard){
                this.setState({ flashcard: q });
            } else {
                this.setState({ value: q, article: this.state.article });
            }
            
        }
        handleVerb(event){
        event.preventDefault();
        let q = event.target.value;        
        const val = event.target.value[event.target.value.length-1];
            if(this.props.lang === 'french'){
                if(val === '1'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(233)}`;
                } else if(val === '2'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(231)}`;
                } else if(val === '3'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(234)}`;
                } else if(val === '4'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(249)}`;
                }
            } else if(this.props.lang === 'german' || this.props.lang === null){
                if(val === '1'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(252)}`;
                } else if(val === '2'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(246)}`;
                } else if(val === '3'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(223)}`;
                } else if(val === '4'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(228)}`;
                } else if(val === '5'){
                q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(233)}`; 
                }            
            }
            this.setState({ answer: q });
        }

        handleFlashcard(event, lang){
            // console.log(event.target.value);
            // event.preventDefault();
            console.log('WORK?');
            // console.log('help?', event.target.value);
            let q = event.target.value;
            const val = event.target.value[event.target.value.length-1];
            console.log(q, val);

            if(lang === 'french'){
                if(val === '1'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(233)}`;
                } else if(val === '2'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(231)}`;
                } else if(val === '3'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(234)}`;
                } else if(val === '4'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(249)}`;
                }
            } else if(lang === 'german' || lang === null){
                if(val === '1'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(252)}`;
                } else if(val === '2'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(246)}`;
                } else if(val === '3'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(223)}`;
                } else if(val === '4'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(228)}`;
                } else if(val === '5'){
                    q = `${event.target.value.slice(0,event.target.value.length-1)}${String.fromCodePoint(233)}`; 
                }            
            }
            console.log(q);
            this.setState({ value: q });
        }

        render(){
            return (
                <ComposedComponent {...this.props} 
                    handleSth={this.handleChange} 
                    handleVerb={this.handleVerb}
                    handleAddVerb={this.handleAddVerb}   
                    handleFlashcard={this.handleFlashcard} 
                 />
            );
        }

    }
    return HandleSpecial;
}