import { SELECTED_LANGUAGE } from './../actions';

export default function(state=null, action){
    switch(action.type){
        case SELECTED_LANGUAGE:
            return action.payload;
        default: 
            return state;
    }
}