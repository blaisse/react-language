import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

import CorrectVerb from './components/correct_verb';
import DisplayTimes from './components/display_times';
import VerbContainer from './components/verb_container';
import DisplayLanguages from './components/display_languages';
import AddVerb from './components/add_verb';
import AddNoun from './components/add_noun';
import FlashcardsGrid from './components/flashcards_grid';
import Menu from './components/menu';
import Main from './components/main';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import Chat from './components/chat/chat';

import HandleSpecial from './components/hoc_special';
import RequireAuth from './components/auth/require_auth';
import { SIGNIN_USER } from './actions';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);

function handleKey(event){
  if(event.keyCode === 27){
     let x = document.querySelector('.menu-icon');
     x.click();
  }
  if(event.keyCode === 112){
    let c = document.querySelector('.chat-click');
    let i = document.querySelector('.chat-input');
    let all = document.querySelector('.chat-icon-expanded');
    c.click();
    // c.focus();
    // focusDiv();
  }
 
}
function focusDiv(){
  const d = document.querySelector('.hitler');
  d.focus();
}
function handleClick(){
  console.log('heil');
}

const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
if(token){
  store.dispatch({ type: SIGNIN_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter> 
      <div tabIndex="0" className="hitler" onKeyDown={handleKey} onLoad={focusDiv}>
        <Menu />
        <Switch>
          <Route exact path="/" component={DisplayLanguages} />
          <Route exact path="/tenses" component={DisplayTimes} />
          <Route exact path="/verb" component={VerbContainer} />
          <Route exact path="/add" component={HandleSpecial(RequireAuth(AddVerb))} />
          <Route exact path ="/addnoun" component={HandleSpecial(RequireAuth(AddNoun))} />
          <Route exact path="/noun" component={VerbContainer} />
          <Route exact path="/flashcards" component={FlashcardsGrid} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signout" component={SignOut} />
        </Switch>
        <Chat />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
