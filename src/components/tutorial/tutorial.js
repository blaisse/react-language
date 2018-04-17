import React, { Component } from 'react';

import Quill from 'quill/core';

import Toolbar from 'quill/modules/toolbar';
// import Snow from 'quill/themes/snow';

// import Bold from 'quill/formats/bold';
// import Italic from 'quill/formats/italic';
// import Header from 'quill/formats/header';

// Quill.register({
//   'modules/toolbar': Toolbar,
//   'themes/snow': Snow,
//   'formats/bold': Bold,
//   'formats/italic': Italic,
//   'formats/header': Header
// });
// import Quill from './Quill';
// console.log('react', Quill);
// import Quill from './quill/core';
// // // console.log('q', Quill);

// import Toolbar from './quill/modules/toolbar';
// import Snow from './quill/themes/snow';

// import Bold from './quill/formats/bold';
// import Italic from './quill/formats/italic';
// import Header from './quill/formats/header';

class Tutorial extends Component {
    constructor(props){
        super(props);
        this.editor = null;
    }
    componentDidMount(){
    this.editor = new Quill('.editor');
}
    render(){
        return (
            <div className="verb-container">
                <div className="editor"></div>
            </div>
        );
    }
}

export default Tutorial;

//

