import { combineReducers } from 'redux';
import VerbsReducer from './reducer_verbs';
import TimeReducer from './reducer_time';
import TimesList from './reducer_times_list';
import FrenchList from './reducer_french_tenses';
import WordReducer from './reducer_word';
import PushReducer from './reducer_push';
import LanguagesReducer from './reducer_languages';
import LangReducer from './reducer_lang';
import NounReducer from './reducer_noun';
import FlashcardReducer from './reducer_flashcard';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_auth';
import chatReducer from './reducer_chat';
import pluralReducer from './reducer_plural';
import userFlashcards from './reducer_user_flashcards';
import sentenceBlock from './reducer_sentence_block';

const rootReducer = combineReducers({
  verb: VerbsReducer,
  times: TimesList,
  time: TimeReducer,
  form: formReducer,
  pushContent: PushReducer,
  languages: LanguagesReducer,
  lang: LangReducer,
  french_tenses: FrenchList,
  noun: NounReducer,
  flashcards: FlashcardReducer,
  userFlashcards: userFlashcards,
  auth: authReducer,
  chat: chatReducer,
  plural: pluralReducer,
  sentenceBlock
});

export default rootReducer;
