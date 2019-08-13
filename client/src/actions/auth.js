import { 
    SET_LOGIN, 
    SET_USER_LOGIN_ERRORS, 
    SET_AUTH, 
    SET_RECOVERY_MSG, 
    SET_RECOVERY_ERRORS 
} from './types';
import axios from 'axios';
import setAuthToken from '../services/setAuthToken';
import jwt_decode from 'jwt-decode';
import history from '../history';

//Login - Get data
export function handleLogin(value) {
    return dispatch => {
        dispatch(setLogin(value));
    };
};

const setLogin = value => ({
    type: SET_LOGIN,
    value
});

// Login - Send request
export function authUser(value, query) {
    return dispatch => {
        axios.post('/api/users/login', value)
        .then(res => { 
            dispatch(setLogin({ email: undefined, password: undefined }));
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            // Set token to auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(handleAuth(decoded));
            history && query
                ? history.push(`/${query}`)
                : history.push('/dashboard')
            query && localStorage.removeItem('defaultLocation');
        })
        .catch(err => {
            const errors = err.response.data;
            return dispatch(handleErrors(errors));
        });
    };
};

// Login - Get errors
export function handleErrors(value) {
    return (dispatch) => {
        dispatch(setErrors(value));
    };
};

const setErrors = value => ({
    type: SET_USER_LOGIN_ERRORS,
    value
});

// Set logged in user 
export const handleAuth = decoded => {
    return (dispatch) => {
        dispatch(setAuth(decoded));
    }
}

const setAuth = value => ({
    type: SET_AUTH,
    value
});

// Log user out
export const logoutUser = () => {
    return (dispatch) => {
        // Remove token from localStorage
        localStorage.removeItem('jwtToken');

        // Remove auth header for future requests
        setAuthToken(false);

        // Set the current user to {} wich will set isAuthenticated to false
        dispatch(handleAuth({}))

        history ? history.push('/') : window.location.href = '/';
    }
}

// Forgot Password - Send email
export const sendRecoveryEmail = (value) => {
    return (dispatch) => {
        axios.post('/api/users/forgot-password', value)
        .then(res => { 
            // Set success message and isLoading false
            dispatch(handleRecoveryMsg(false, res.data));
        })
        .catch(err => {
            const errors = err.response.data;
            dispatch(handleRecoveryMsg(false));
            return dispatch(handleRecoveryErrors(errors));
        });
    }
}

// Forgot Password - Update password and isLoading false
export const sendNewPassword = (value, token) => {
    return (dispatch) => {
        axios.post(`/api/users/reset/${token}`, value)
        .then(res => { 
            // Set success message and isLoading false
            dispatch(handleRecoveryMsg(false, res.data));
            history.push('/login');
        })
        .catch(err => {
            const errors = err.response.data;
            // isLoading is false
            dispatch(handleRecoveryMsg(false));
            return dispatch(handleRecoveryErrors(errors));
        });
    }
}

// Forgot Password - Handle Api Msg
export const handleRecoveryMsg = (isLoading, value) => {
    return (dispatch) => {
        dispatch(setRecoveryMsg(isLoading, value));        
    }
}

const setRecoveryMsg = (isLoading, value) => ({
    type: SET_RECOVERY_MSG,
    isLoading, value
});

// Forgot Password - Get errors
export function handleRecoveryErrors(value) {
    return (dispatch) => {
        dispatch(setRecoveryErrors(value));
    };
};

const setRecoveryErrors = value => ({
    type: SET_RECOVERY_ERRORS,
    value
});
