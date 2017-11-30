import { SET_URL } from './../actions';

export default function(state=false, action){
    switch(action.type){
        case SET_URL: 
        // console.log('===', action.payload);
        
            return action.payload;
        default: 
            return state;
    }
}