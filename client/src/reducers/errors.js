import { 
	SET_USER_REGISTRATION_ERRORS, 
	SET_USER_LOGIN_ERRORS, 
	SET_PROJECT_REGISTRATION_ERRORS, 
	SET_PROJECT_ERRORS,
	SET_RECOVERY_ERRORS,
	SET_IMG_UPLOAD_ERRORS
} from '../actions/types';

const initialState = {
	user: {},
	login: {},
	project: {},
	upload: {}
}

export function errors(state = initialState, action) {
	switch (action.type) {
		case SET_USER_REGISTRATION_ERRORS:
			const checkUserForm = state.user 
				? { ...state.user, ...action.value }
				: action.value;
			return  { 
				...state, 
				user: checkUserForm
			}
		case SET_USER_LOGIN_ERRORS:
			return  { 
				...state, 
				login: action.value
			}
		case SET_PROJECT_REGISTRATION_ERRORS:
			const checkProjectForm = state.project 
				? { ...state.project, ...action.value } 
				: action.value;
			return  { 
				...state, 
				project: checkProjectForm
			}
		case SET_PROJECT_ERRORS:
			const checkState = state.project 
				? { ...state.project, ...action.value } 
				: action.value;
			return  { 
				...state, 
				project: checkState
			}
		case SET_RECOVERY_ERRORS:
			return  { ...state, ...action.value }
		case SET_IMG_UPLOAD_ERRORS:
			const checkUpload = state.project 
				? { ...state.project, ...action.value } 
				: action.value;
			return  { 
				...state, 
				upload: checkUpload
			}
		default:
			return state;
	}
};

