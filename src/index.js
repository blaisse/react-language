import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';

import CorrectVerb from './components/correct_verb';
import DisplayTimes from './components/display_times';
import VerbContainer from './components/verb_container';
import AddVerb from './components/add_verb';
import Menu from './components/menu';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={DisplayTimes} />
          <Route exact path="/verb" component={VerbContainer} />
          <Route exact path="/add" component={AddVerb} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
