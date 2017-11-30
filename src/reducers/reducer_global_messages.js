import { SET_GLOBAL_MESSAGES } from './../actions';

export default function(state=[], action){
    switch(action.type){
        case SET_GLOBAL_MESSAGES:
            return state.concat(action.payload);
        default:
            return state;
    }
}