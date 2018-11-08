import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    INIT_REQUEST_COMPLETE
} from '../actions/loginActions';

const initialState = {
    username: sessionStorage.getItem("username"),
    token: sessionStorage.getItem("token"),
    isLogged: sessionStorage.getItem("isLogged") === "true",
    error: null,
    initRequested: false
}

function loginReducer(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case REGISTER_SUCCESS:
            newState = {
                ...state,
                error: null
            }

            return newState;
        case REGISTER_FAILED:
            newState = {
                ...state,
                error: action.error
            }

            return newState;
        case LOGIN_SUCCESS:
            newState = {
                ...state,
                error: null,
                isLogged: true,
                username: action.username,
                token: action.token,
                initRequested: true
            }

            return newState;
        case LOGIN_FAILED:
            newState = {
                ...state,
                error: action.error
            }

            return newState;
        case LOGOUT_SUCCESS:
            newState = {
                ...state,
                error: null,
                isLogged: false,
                username: null,
                token: null
            }

            return newState;
        case LOGOUT_FAILED:
            newState = {
                ...state,
                error: action.error
            }

            return newState;
        case INIT_REQUEST_COMPLETE:
            newState = {
                ...state,
                initRequested: false
            }

            return newState;
        default:
            return state;
    }
}

export default loginReducer;
