import { SET_USER } from '../actions/types'

const initialState =
{
  name: '',
  email: '',
  password: '',
  confirmedPassword: '',
  birthday: {},
  gender: '',
  color: '',
  state: {},
  city: '',
  currentField: '',
  socialNumber: ''
}

export function userForm (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.value }
    default:
      return state
  }
};
