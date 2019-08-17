import { SET_SCREEN_SIZE } from '../actions/types'

const initialState = {}

export function screen (state = initialState, action) {
  switch (action.type) {
    case SET_SCREEN_SIZE:
      return action.value
    default:
      return state
  }
};
