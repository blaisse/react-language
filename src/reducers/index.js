import { combineReducers } from 'redux';
import VerbsReducer from './reducer_verbs';
import TimeReducer from './reducer_time';
import TimesList from './reducer_times_list';
import WordReducer from './reducer_word';
import PushReducer from './reducer_push';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  verb: VerbsReducer,
  times: TimesList,
  time: TimeReducer,
  form: formReducer,
  pushContent: PushReducer
});

export default rootReducer;
