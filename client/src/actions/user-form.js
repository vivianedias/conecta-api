import { SET_USER, SET_USER_REGISTRATION_ERRORS } from './types';
import axios from 'axios';
import history from '../history';

export function setUser(value) {
    return dispatch => {
        dispatch(handleUser(value));
    };
};
const handleUser = value => ({
    type: SET_USER,
    value
});

export function handleErrors(value) {
    return (dispatch) => {
        dispatch(setErrors(value));
    };
};
const setErrors = value => ({
    type: SET_USER_REGISTRATION_ERRORS,
    value
});

export function registerUser() {
    return (dispatch, getState) => {

        const state = getState();

        const userForm = state.userForm;
        const { birthday: { day, month, year }, state: { state_name } } = userForm;

        const newUser = {
            ...userForm,
            state: state_name ? state_name : '',
            birthday: day && month && year ? day + '/' + month + '/' + year : ''
        }

        dispatch(setUser(newUser));

        axios.post('/api/users/register', newUser)
            .then(() => {
                localStorage.defaultLocation
                    ? history.push(`/login?${localStorage.defaultLocation}`)
                    : history.push('/login');
            })
            .catch(err => {
                const errors = err.response.data;
                return dispatch(handleErrors(errors));
            });
    };
};

