import { FETCH_NOUN } from './../actions';

export default function(state=null, action){
    switch(action.type){
        case FETCH_NOUN:
            return action.payload.data;
        default:
            return state;
    }
}