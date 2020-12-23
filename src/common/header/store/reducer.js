import * as constants from './constants';
import {fromJS} from 'immutable';

const defaulfState = fromJS({
    focused: false,
    list: []
});


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaulfState, action) => {
    switch(action.type){
        case constants.SEARCH_FOCUS : 
            return state.set('focused', true);
        case constants.SEARCH_BLUR : 
            return state.set('focused', false);
        case constants.CHANGE_LIST :
            return state.set('list', action.data);
        default :
            return state;
    }
}