import { combineReducers } from 'redux';
import { screen } from './screen';
import { userForm } from './user-form';
import { errors } from './errors';
import { auth } from './auth';
import { project } from './project';
import { upload } from './upload';

export default combineReducers({
    screen,
    userForm,
    errors,
    auth,
    project,
    upload
});
