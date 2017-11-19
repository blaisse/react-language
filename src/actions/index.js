import axios from 'axios';

export const FETCH_VERB = 'fetch_verb';
export const RESET_VERB = 'reset_verb';
export const SELECTED_TIME = 'selected_time';
export const SELECTED_LANGUAGE = 'selected_language';
export const CREATE_VERB = 'create_verb';
export const FETCH_WORD = 'fetch_word';
export const FETCH_FLASHCARD = 'fetch_flashcard';
export const CLEAR_FLASHCARD = 'clear_flashcard';
export const PATCH_VERB = 'patch_verb';
export const PUSH_CONTENT = 'push_content';
export const FETCH_NOUN = 'fetch_noun';
export const RESET_NOUN = 'reset_noun';
export const ADD_NOUN = 'add_noun';
export const GET_NOUN = 'get_noun';
export const FETCH_PLURAL = 'fetch_plural';
export const SAVE_FLASHCARD = 'save_flashcard';
export const FETCH_USER_FLASHCARDS = 'fetch_user_flashcards';
export const CLEAR_USER_FLASHCARD = 'clear_user_flashcard';
export const FETCH_SINGLE_USER_FLASHCARD = 'fetch_single_user_flashcard';
export const FETCH_SENTENCE_BLOCK = 'fetch_sentence_block';
export const CLEAR_SENTENCE_BLOCK = 'clear_sentence_block';

export const SIGNIN_USER = 'signin_user';
export const SIGNUP_USER = 'signup_user';
export const SIGNOUT_USER = 'signout_user';
export const AUTH_ERROR = 'auth_error';
export const AUTH_CLEAN = 'auth_clean';

export const EXPAND_CHAT = 'expand_chat';
export const HIDE_CHAT = 'hide_chat';
export const PRIVATE_CHAT = 'private_chat';

const ROOT_URL = 'https://safe-badlands-67690.herokuapp.com';
// const ROOT_URL = 'http://localhost:3007';

export function addPrivate(room, message){

}

export function expandChat(){
    return {
        type: EXPAND_CHAT
    };
}

export function hideChat(){
    return {
        type: HIDE_CHAT
    };
}

export function signupUser({ email, password }, obj){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signup`, { email, password }).then(response => {
            // console.log('REWS', response.data);
            //log user in
            dispatch({ type: SIGNIN_USER });
            //save token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('lang', response.data.lang);
            console.log('Signed UP');
            //redirect somewhere
            obj.props.history.push('/');
        }).catch((e) => {
            console.log(e.response);
            dispatch(authError(e.response.data.error));//from server ex. Email in use
        });
    }
}

export function signinUser({ email, password }, obj){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signin`, { email, password }).then(response => {
            // console.log('response', response);
            dispatch({ type: SIGNIN_USER });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('lang', response.data.lang);
            dispatch({ type: SELECTED_LANGUAGE, payload: localStorage.getItem('lang') });
            console.log('signed in boy');
            obj.props.history.push('/');
        }).catch((e) => {
            dispatch(authError('Wrong credentials'));
        }).then(() => {
            // store.dispatch({ type: SELECTED_LANGUAGE, payload: localStorage.getItem('lang') });
        });
    }
}
export function signoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('lang');
    return {
        type: SIGNOUT_USER
    };
}
export function authClean(){
    return {
        type: AUTH_CLEAN
    };
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function fetchVerb(tenses, language){
    // console.log(tenses);
    // console.log(typeof(tenses[0]));
    // const request = axios.post(`${ROOT_URL}/word`, tenses);;
    if(!(typeof(tenses[0]) === 'string')){
        const ar = tenses.map((item) => {
            return item.time;
        });
        const obj = {
            time: ar,
            lang: language
        };
        const request = axios.post(`${ROOT_URL}/word`, obj);
        return {
            type: FETCH_VERB,
            payload: request
        };
    } else {
        const obj = {
            time: tenses,
            lang: language
        };
        const request = axios.post(`${ROOT_URL}/word`, obj);
        return {
            type: FETCH_VERB,
            payload: request
        };
    }

}
export function resetVerb(){
    return {
        type: RESET_VERB,
        payload: {}
    };
}
export function selectTime(time){
    // console.log('time', time);
    if(!(typeof(time[0]) === 'string')){
        //times: array of objects
        const ar = time.map((item) => {
            return item.time;
        });
        return {
            type: SELECTED_TIME,
            payload: ar
        };
        // console.log('selectTime',ar);
    } else {
        //tense: array of strings
        // console.log('selectTime string',time);
        return {
            type: SELECTED_TIME,
            payload: time
        };
    }
    
}
export function selectLanguage(lang){
    //make a call to server and save the selected language
    //store it in a token, if lang is not there, only then read it from DB
    localStorage.setItem('lang', lang);
    const token = localStorage.getItem('username');
    if(token){
        //save to DB
        const send = {
            username: token,
            lang
        };
        const request = axios.post(`${ROOT_URL}/setlang`, send);
    }
    return {
        type: SELECTED_LANGUAGE,
        payload: lang
    };
}
export function fetchWord(word, callback){
    const request = axios.get(`${ROOT_URL}/word/${word}`);
    return {
        type: FETCH_WORD,
        payload: request
    };
}
export function createVerb(values){
    // console.log(values);
    const request = axios.post(`${ROOT_URL}/words`, values);
    return {
        type: CREATE_VERB,
        payload: request
    };
}
export function patchVerb(values){
    const request = axios.patch(`${ROOT_URL}/word/${values.word}`, values).then(() => {
        console.log('Patched successfully');
    });
    return {
        type: PATCH_VERB,
        payload: "xd"
    };
}

export function pushContent(state){
    // console.log('pushContent', state);
    return {
        type: PUSH_CONTENT,
        payload: state
    };
}
//NOUN
export function fetchNoun(language){
    const request = axios.post(`${ROOT_URL}/fetch`, {lang: language});
    return {
        type: FETCH_NOUN,
        payload: request
    };
}
export function addNoun(data){
    const request = axios.post(`${ROOT_URL}/noun`, data);
    return {
        type: ADD_NOUN,
        payload: request
    };
}
export function resetNoun(){
    return {
        type: RESET_NOUN,
        payload: {}
    };
}
export function getNoun(name){
    const request = axios.get(`${ROOT_URL}/noun/${name}`);
    return {
        type: GET_NOUN,
        payload: request
    };
}
export function fetchFlashcard(language){
    const request = axios.post(`${ROOT_URL}/fetchflashcard`, {lang: language});
    return {
        type: FETCH_FLASHCARD,
        payload: request
    };
}
export function clearFlashcard(){
    console.log('clearing..');
    return {
        type: CLEAR_FLASHCARD,
        payload: null
    };
}
export function saveFlashcardSet(data, callback){
    // console.log('data', data, owner, title);
    // console.log('callback', callback);
    // console.log('c2', callback());
    const request = axios.post(`${ROOT_URL}/savecard`, {data: data.ar, owner: data.owner, title: data.title}).then(() => callback());
    console.log('rr', request);
    return {
        type: SAVE_FLASHCARD,
        payload: request
    };
}

export function clearFlashcardSet(){
    return {
        type: CLEAR_USER_FLASHCARD,
        payload: []
    };
}

export function fetchPlural(lang){
    const request = axios.get(`${ROOT_URL}/plural/${lang}`);
    return {
        type: FETCH_PLURAL,
        payload: request
    };
}

export function fetchUserFlashcards(user){
    // console.log('u', user);
    return function(dispatch){
        axios.get(`${ROOT_URL}/getcard/${user}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then((response) => {
            // console.log('r', response);
            dispatch({ type: FETCH_USER_FLASHCARDS, payload: response.data });
        });
    }
}

export function fetchSingleFlashcard(id){
    const request = axios.get(`${ROOT_URL}/getsinglecard/${id}`);
    return {
        type: FETCH_SINGLE_USER_FLASHCARD,
        payload: request
    };
}

export function fetchSentenceBlock(lang, level){
    const request = axios.get(`${ROOT_URL}/fetchsentence/${lang}/${level}`);
    return {
        type: FETCH_SENTENCE_BLOCK,
        payload: request
    };
}

export function clearSentenceBlock(){
    return {
        type: CLEAR_SENTENCE_BLOCK,
        payload: {}
    };
}
