import { FETCH_VERB } from './../actions'

export default function(state={}, action){
    switch(action.type){
        case FETCH_VERB:
            return action.payload.data;
        default:
            return state;
    }
}