import { SET_LOGIN, SET_AUTH, SET_RECOVERY_MSG } from '../actions/types'
import utilsServices from '../services/utils'

const initialState = {
  isAuthenticated: false,
  user: {
    email: undefined,
    password: undefined
  },
  recovery: '',
  isLoading: false
}

export function auth (state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        user: { ...state.user, ...action.value }
      }
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: !utilsServices.isEmpty(action.value),
        user: action.value
      }
    case SET_RECOVERY_MSG:
      return {
        ...state,
        recovery: {
          msg: action.value,
          isLoading: action.isLoading
        }
      }
    default:
      return state
  }
};
