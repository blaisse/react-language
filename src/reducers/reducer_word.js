import { FETCH_WORD } from './../actions'

export default function(state={}, action){
    switch(action.type){
        case FETCH_WORD:
            console.log('FETCH', action);
            return action.payload.data;
        default:
            return state;
    }
}