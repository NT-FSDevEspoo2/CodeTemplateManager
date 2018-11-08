// Action types

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const INIT_REQUEST_COMPLETE = "INIT_REQUEST_COMPLETE";

// Actions

export function onRegister(user) {
    return dispatch => {
        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }
        return fetch("/register", requestObject).then((response) => {
            if (response.ok) {
                dispatch(registerSuccess());
            } else if (response.status === 409) {
                console.error(response);
                dispatch(registerFailed("Username already exists"));
            } else {
                console.error(response);
                dispatch(registerFailed("Register failed"));
            }
        }).catch((error) => {
            console.error(error);
            dispatch(registerFailed("Register failed"));
        });
    }
}

export function onLogin(user) {
    return dispatch => {
        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }
        return fetch("/login", requestObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    sessionStorage.setItem("isLogged", true);
                    sessionStorage.setItem("token", data.token);

                    if (user) {
                        sessionStorage.setItem("username", user.username);
                    }

                    dispatch(loginSuccess(user.username, data.token));
                });
            } else if (response.status === 403) {
                dispatch(loginFailed("Wrong username or password"));
            } else {
                console.error(response);
                dispatch(loginFailed("Login failed"));
            }
        }).catch((error) => {
            console.error(error);
            dispatch(loginFailed("Login failed"));
        });
    }
}

export function onLogout(token) {
    return dispatch => {
        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        return fetch("/logout", requestObject).then((response) => {
            if (response.ok) {
                sessionStorage.setItem("isLogged", null);
                sessionStorage.setItem("token", null);
                sessionStorage.setItem("username", null);

                dispatch(logoutSuccess());
            } else if (response.status === 404) {
                dispatch(logoutFailed("Not logged in"));
            } else {
                console.error(response);
                dispatch(logoutFailed("Logout failed"));
            }
        }).catch((error) => {
            console.error(error);
            dispatch(logoutFailed("Logout failed"));
        });
    }
}

// Action creators

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    }
}

export function registerFailed(error) {
    return {
        type: REGISTER_FAILED,
        error: error
    }
}

export function loginSuccess(username, token) {
    return {
        type: LOGIN_SUCCESS,
        username: username,
        token: token,
    }
}

export function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        error: error
    }
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function logoutFailed(error) {
    return {
        type: LOGOUT_FAILED,
        error: error
    }
}

export function initRequestCompleted() {
    return {
        type: INIT_REQUEST_COMPLETE
    }
}