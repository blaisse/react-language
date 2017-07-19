import {SELECTED_TIME} from './../actions';

export default function(state=null, action){
    switch(action.type){
        case SELECTED_TIME:
            return action.payload;
        default:
            return state;
    }
}