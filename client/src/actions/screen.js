import { SET_SCREEN_SIZE } from './types';

const setScreen = value => ({
    type: SET_SCREEN_SIZE,
    value
});

export function setScreenSize(value) {
    return dispatch => {
        dispatch(setScreen(value));
    };
};