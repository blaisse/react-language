import axios from 'axios';

export const FETCH_VERB = 'fetch_verb';
export const RESET_VERB = 'reset_verb';
export const SELECTED_TIME = 'selected_time';
export const SELECTED_LANGUAGE = 'selected_language';
export const CREATE_VERB = 'create_verb';
export const FETCH_WORD = 'fetch_word';
export const PATCH_VERB = 'patch_verb';
export const PUSH_CONTENT = 'push_content';

const ROOT_URL = 'https://safe-badlands-67690.herokuapp.com';

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