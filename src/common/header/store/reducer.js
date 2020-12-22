import * as constants from './constants';
import {fromJS} from 'immutable';

const defaulfState = fromJS({
    focused: false
});


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaulfState, action) => {
    if(action.type === constants.SEARCH_FOCUS){
        return state.set('focused', true);
    }
    if(action.type === constants.SEARCH_BLUR){
        return state.set('focused', false);
    }

    return state;
}