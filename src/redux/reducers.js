import { combineReducers } from 'redux';
import { SET_EMOJI } from './actions';

let emojiReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_EMOJI :
            return { ...state,
                setEmoji: action.payload,
            }
        default :
            return state
    }
}

export default combineReducers({
    emoji: emojiReducer
});
