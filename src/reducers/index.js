import { combineReducers } from 'redux';
import { SET_PAGE } from '../constants/ActionTypes';
import { LOGIN } from '../constants/Pages';

const initialState = {
  page: LOGIN,
};

function page(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE:
      return Object.assign({}, state, {
        page: action.page,
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  page,
});

export default rootReducer;
