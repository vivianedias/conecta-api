import { 
    SET_PROJECT_FORM, 
    SET_PROJECT_FORM_SPECIAL_NEEDS, 
    SET_PROJECT_FORM_TAGS, 
    REMOVE_PROJECT_FORM_TAG,
    SET_PROJECT_FORM_ESTIMATED_VALUE,
    SET_PROJECT_FORM_RES,
    SET_USER_PROJECTS,
    SET_PROJECT,
    SET_PROJECTS,
    SET_PROJECT_IMG
} from '../actions/types';

const initialState = {
    projectRegistration: {
        handle: '',
        name: '',
        category: '',
        description: '',
        objective: '',
        format: '',
        specialNeeds: '',
        location: '',
        estimatedValue: '',
        tags: [], // Do not change this initial value 
        img: '',
    },
    userProjects: [],
    project: {},
    allProjects: []
}

export function project(state = initialState, action) {
    switch (action.type) {
        case SET_PROJECT_FORM:
            const checkForm = state.projectRegistration 
                ? { ...state.projectRegistration, ...action.value } 
                : action.value;
            return  { 
                ...state, 
                projectRegistration: checkForm
            }
        case SET_PROJECT_FORM_SPECIAL_NEEDS:
            return  { 
                ...state, 
                projectRegistration: {
                    ...state.projectRegistration,
                    specialNeeds: { 
                        ...state.specialNeeds,
                        [action.id]: action.value
                    }
                }
            }
        case SET_PROJECT_FORM_TAGS:
            const checkTags = state.projectRegistration && state.projectRegistration.tags 
                ? [ ...state.projectRegistration.tags, action.value ]
                : action.value
            return  { 
                ...state, 
                projectRegistration: {
                    ...state.projectRegistration,
                    tags: checkTags
                }
            }   
        case REMOVE_PROJECT_FORM_TAG:
            const filteredTags = state.projecRegistration &&state.projectRegistration.tags.length > 1 
                ? state.projectRegistration.tags.filter(tag => tag !== action.value)
                : []
            return  { 
                ...state,
                projectRegistration: {
                    ...state.projectRegistration,
                    tags: filteredTags
                }
            }
        case SET_PROJECT_FORM_ESTIMATED_VALUE:
            const formatter = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            })
            return {
                ...state,
                projectRegistration: {
                    ...state.projectRegistration,
                    estimatedValue: formatter.format(action.value)
                }
            }
        case SET_PROJECT_FORM_RES:
            return  { 
                ...state, 
                projectRegistration: {
                    success: action.msg,
                    handle: action.handle
                }
            }
        case SET_USER_PROJECTS:
            const checkUserProjects = state.userProjects 
                ? [...state.userProjects, ...action.value ]
                : action.value
            return  { 
                ...state,
                userProjects: checkUserProjects
            }
        case SET_PROJECT:
            return  { 
                ...state,
                project: { ...state.project, ...action.value }
            }
        case SET_PROJECTS:
            const checkProjects = state.projects 
                ? [ ...state.projects, ...action.value ] 
                : action.value;
            return  { 
                ...state,
                allProjects: checkProjects
            }
        case SET_PROJECT_IMG:
            return  { 
                ...state,
                images: {
                    ...state.images,
                    [action.projectId]: action.filename
                }
            }
        default:
            return state;
    }
};