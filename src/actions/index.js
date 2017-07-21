import axios from 'axios';

export const FETCH_VERB = 'fetch_verb';
export const SELECTED_TIME = 'selected_time';
export const CREATE_VERB = 'create_verb';
export const FETCH_WORD = 'fetch_word';
export const PATCH_VERB = 'patch_verb';

const ROOT_URL = 'https://safe-badlands-67690.herokuapp.com';

export function fetchVerb(tenses){
    // console.log(tenses);
    // console.log(typeof(tenses[0]));
    // const request = axios.post(`${ROOT_URL}/word`, tenses);;
    if(!(typeof(tenses[0]) === 'string')){
        const ar = tenses.map((item) => {
            return item.time;
        });
        const obj = {
            time: ar
        };
        const request = axios.post(`${ROOT_URL}/word`, obj);
        return {
            type: FETCH_VERB,
            payload: request
        };
    } else {
        const obj = {
            time: tenses
        };
        const request = axios.post(`${ROOT_URL}/word`, obj);
        return {
            type: FETCH_VERB,
            payload: request
        };
    }

}
export function selectTime(time){
    // console.log('time', time);
    return {
        type: SELECTED_TIME,
        payload: time
    }
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