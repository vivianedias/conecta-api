import { 
    SET_PROJECT_FORM, 
    SET_PROJECT_REGISTRATION_ERRORS, 
    SET_PROJECT_FORM_SPECIAL_NEEDS, 
    SET_PROJECT_FORM_TAGS,
    REMOVE_PROJECT_FORM_TAG,
    SET_PROJECT_FORM_ESTIMATED_VALUE,
    SET_PROJECT_FORM_RES,
    SET_USER_PROJECTS,
    SET_PROJECT_ERRORS,
    SET_PROJECTS,
    SET_PROJECT,
} from './types';
import axios from 'axios';
import history from '../history';

// Project - Get data
export function handleProject(value) {
    return dispatch => {
        dispatch(setProjectForm(value));
    };
};

const setProjectForm = value => ({
    type: SET_PROJECT_FORM,
    value
});

// Title and Category - Send request
export function handleProjectAuth(value) {
    return dispatch => {
        localStorage.setItem('projectRegistration', JSON.stringify(value));

        dispatch(handleProject({ name: undefined, category: undefined }));
        
        history.push('/enviar-projeto');
    };
};

// Project - Handle specialNeeds input
export function handleSpecialNeeds(id, value) {
    return dispatch => {
        dispatch(setSpecialNeeds(id, value))
    };
};

const setSpecialNeeds = (id, value) => ({
    type: SET_PROJECT_FORM_SPECIAL_NEEDS,
    id, value
});

// Project - Handle tags input
export function handleTags(value) {
    return dispatch => {
        dispatch(setTags(value))
    };
};

const setTags = (value) => ({
    type: SET_PROJECT_FORM_TAGS,
    value
});

// Project - Remove tag from array
export function filterTags(value) {
    return dispatch => {
        dispatch(removeTag(value))
    };
};

const removeTag = (value) => ({
    type: REMOVE_PROJECT_FORM_TAG,
    value
});

// Project - Format estimatedValue
export function setEstimatedValue(value) {
    return dispatch => {
        dispatch(formatEstimatedValue(value))
    };
};

const formatEstimatedValue = (value) => ({
    type: SET_PROJECT_FORM_ESTIMATED_VALUE,
    value
});

// Project - Register Project
export function registerProject(projectForm) {
    const project = {
        ...projectForm,
        pictureUrl: 'http://www.ospaparazzi.com.br/imagem/201203/121849353.jpg'
    }
    return dispatch => {
        axios.post('/api/projects', project)
        .then((res) => {
            dispatch(setProjectSuccess('Seu projeto foi enviado com sucesso! :)', res.data.handle));
            localStorage.removeItem('projectRegistration');
            history.push({
                pathname: '/projeto-enviado',
                search: '?valid=true',
            });
        })
        .catch(err => {
            const errors = err.response.data;
            return dispatch(handleErrors(errors));
        });
    };
};

// Project - Set success message
const setProjectSuccess = (msg, handle) => ({
    type: SET_PROJECT_FORM_RES,
    msg, handle
});

export function handleProjectSuccess(msg, handle) {
    return dispatch => {
        dispatch(setProjectSuccess(msg, handle));
    };
};

// Project - Get errors
export function handleErrors(value, path) {
    return (dispatch) => {
        switch(path) {
            case "post_project":
                return dispatch(setPostErrors(value));
            default:
                return dispatch(setFetchErrors(value));
        }
    };
};

const setPostErrors = value => ({
    type: SET_PROJECT_REGISTRATION_ERRORS,
    value
});

const setFetchErrors = value => ({
    type: SET_PROJECT_ERRORS,
    value
});

// Project - Get user projects
export function getUserProjects() {
    return (dispatch) => {
        axios.get('/api/projects')
        .then(res => {
            dispatch(setUserProjects(res.data));
        })
        .catch(err => {
            const errors = err.response.data;
            return dispatch(handleErrors(errors));
        });
    };
};

const setUserProjects = value => ({
    type: SET_USER_PROJECTS,
    value
});

// Project - Get project (page)
export function getProject(handle) {
    return (dispatch) => {
        axios.get(`/api/projects/name/${handle}`)
        .then(res => {
            axios.get(`/api/projects/image/${res.data.img}`)
            .then(imgRes => {
                console.log(imgRes);
                dispatch(setProject({ 
                    ...res.data, 
                    img: imgRes.data.filename
                }))
            })
            .catch(err => {
                const errors = err.response.data;
                return dispatch(handleErrors(errors));
            })
        })
        .catch(err => {
            const errors = err.response.data;
            return dispatch(handleErrors(errors));
        });
    };
};

const setProject = value => ({
    type: SET_PROJECT,
    value
});

// Project - Get all projects
export function getAllProjects() {
    return (dispatch) => {
        axios.get('/api/projects/all')
        .then(res => {
            dispatch(setProjects(res.data));
        })
        .catch(err => {
            const errors = err.response.data;
            return dispatch(handleErrors(errors));
        });
    };
};

const setProjects = value => ({
    type: SET_PROJECTS,
    value
});

// Project - Update Project
export function updateProject(projectForm, handle) {
    return dispatch => {
        axios.post(`/api/projects/user/${handle}`, projectForm)
        .then(res => {
            dispatch(setProjectSuccess(
                'Seu projeto foi atualizado com sucesso! :)'
            ));
        })
        .catch(err => {
            const errors = err.response.data;
            return dispatch(handleErrors(errors));
        });
    };
};