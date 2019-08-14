import { SET_IMG_UPLOAD } from '../actions/types';

const initialState = {}

export function upload(state = initialState, action) {
  switch (action.type) {
    case SET_IMG_UPLOAD:
      return  { 
        ...state, 
        ...action.value,
				isLoading: action.isLoading
      }
    default:
      return state;
  }
};