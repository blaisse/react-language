import { FETCH_FLASHCARD, CLEAR_FLASHCARD } from './../actions';

export default function(state=null, action){
    switch(action.type){
        //add onto exisits state on each load [...,state]?
        case FETCH_FLASHCARD:
            // return [...state, action.payload.data]
            return action.payload.data;
        case CLEAR_FLASHCARD:
            return action.payload; 
        default:
            return state;
    }
}