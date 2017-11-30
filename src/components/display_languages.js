import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLanguage } from './../actions';

class DisplayLanguages extends Component {
    renderLanguages(){
        return this.props.languages.map((item) => {
            // console.log(item);
            return (
                <div className="single-language" key={item} onClick={() => {
                    this.props.selectLanguage(item);
                    document.querySelector('.hitler').focus();
                    }}>
                    <Link to='/tenses'>{this.displayFlag(item)}</Link>
                </div>
            );
        });
    }
    displayFlag(item){
        if(item === 'french'){
            return (
                <div>
                    <img className="flag-french" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png" alt=""/>
                </div>
            );
        } else {
            return (
                <div>
                    <img className="flag-german" src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png" alt=""/>
                </div>
            );
        }
    }
    render(){
        return (
             <div className={"push-container " + (this.props.push ? 'app-push' : '')}>
                <div className="app-container app-container-front">
                    {/* <h2 className="flags-header">Select a language to learn</h2> */}
                    <div className="flags-container">
                        <div className="flags-container-flags">{this.renderLanguages()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        languages: state.languages,
        // push: state.pushContent
    };
}

export default connect(mapStateToProps, { selectLanguage })(DisplayLanguages);