import {
    GET_TECHNOLOGIES_SUCCESS,
    GET_TECHNOLOGIES_FAILED,
    GET_TEMPLATES_SUCCESS,
    GET_TEMPLATES_FAILED,
    CREATE_TEMPLATE_SUCCESS,
    CREATE_TEMPLATE_FAILED,
    EDIT_TEMPLATE_SUCCESS,
    EDIT_TEMPLATE_FAILED,
    REMOVE_TEMPLATE_SUCCESS,
    REMOVE_TEMPLATE_FAILED
} from '../actions/templateActions';

const initialState = {
}

function templateReducer(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case GET_TECHNOLOGIES_SUCCESS:
            newState = {
                ...state,
                error: null,
                technologies: action.technologies
            }

            return newState;
        case GET_TECHNOLOGIES_FAILED:
            newState = {
                ...state,
                error: action.error
            }

            return newState;
        case GET_TEMPLATES_SUCCESS:
            newState = {
                ...state,
                error: null,
                templates: action.templates
            }

            return newState;
        case GET_TEMPLATES_FAILED:
            newState = {
                ...state,
                error: action.error
            }

            return newState;
        case CREATE_TEMPLATE_SUCCESS:
            newState = {
                ...state,
                error: null,
                createdTemplate: action.createdTemplate
            }

            return newState;
        case CREATE_TEMPLATE_FAILED:
            newState = {
                ...state,
                error: action.error
            }

            return newState;
        case EDIT_TEMPLATE_SUCCESS:
            newState = {
                ...state,
                error: null
            }

            return newState;
        case EDIT_TEMPLATE_FAILED:
            newState = {
                ...state,
                error: action.error
            }

            return newState;
        case REMOVE_TEMPLATE_SUCCESS:
            newState = {
                ...state,
                error: null
            }

            return newState;
        case REMOVE_TEMPLATE_FAILED:
            newState = {
                ...state,
                error: action.error
            }

            return newState;
        default:
            return state;
    }
}

export default templateReducer;