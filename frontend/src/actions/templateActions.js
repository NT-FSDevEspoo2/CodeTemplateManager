// Action types

export const GET_TECHNOLOGIES_SUCCESS = "GET_TECHNOLOGIES_SUCCESS";
export const GET_TECHNOLOGIES_FAILED = "GET_TECHNOLOGIES_FAILED";
export const GET_TEMPLATES_SUCCESS = "GET_TEMPLATES_SUCCESS";
export const GET_TEMPLATES_FAILED = "GET_TEMPLATES_FAILED";
export const CREATE_TEMPLATE_SUCCESS = "CREATE_TEMPLATE_SUCCESS";
export const CREATE_TEMPLATE_FAILED = "CREATE_TEMPLATE_FAILED";
export const EDIT_TEMPLATE_SUCCESS = "EDIT_TEMPLATE_SUCCESS";
export const EDIT_TEMPLATE_FAILED = "EDIT_TEMPLATE_FAILED";
export const REMOVE_TEMPLATE_SUCCESS = "REMOVE_TEMPLATE_SUCCESS";
export const REMOVE_TEMPLATE_FAILED = "REMOVE_TEMPLATE_FAILED";

// Actions

const templatesPath = "/api/templates";

export function getTechnologies(token) {
    return dispatch => {
        let requestObject = {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        return fetch("/api/technologies", requestObject).then((response) => {
            if (response.ok) {
                response.json().then((technologies) => {
                    dispatch(getTechnologiesSuccess(technologies));
                });
            } else {
                console.error(response);
                dispatch(getTechnologiesFailed("Failed to get technologies"));
            }
        }).catch((error) => {
            console.error(error);
            dispatch(getTechnologiesFailed("Failed to get technologies"));
        });
    }
}

export function getTemplates(token) {
    return dispatch => {
        let requestObject = {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        return fetch(templatesPath, requestObject).then((response) => {
            if (response.ok) {
                response.json().then((templates) => {
                    dispatch(getTemplatesSuccess(templates));
                });
            } else {
                console.error(response);
                dispatch(getTemplatesFailed("Failed to get templates"));
            }
        }).catch((error) => {
            console.error(error);
            dispatch(getTemplatesFailed("Failed to get templates"));
        });
    }
}

export function createTemplate(template, token) {
    return dispatch => {
        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(template)
        }
        return fetch(templatesPath, requestObject).then((response) => {
            if (response.ok) {
                dispatch(getTechnologies(token));
                dispatch(getTemplates(token));

                dispatch(createTemplateSuccess());
            } else {
                console.error(response);
                dispatch(createTemplateFailed("Failed to create template"));
            }
        }).catch((error) => {
            console.error(error);
            dispatch(createTemplateFailed("Failed to create template"));
        });
    }
}

export function editTemplate(template, token) {
    return dispatch => {
        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(template)
        }
        return fetch(templatesPath + "/" + template.id, requestObject).then((response) => {
            if (response.ok) {
                dispatch(getTechnologies(token));
                dispatch(getTemplates(token));

                dispatch(editTemplateSuccess());
            } else {
                console.error(response);
                dispatch(editTemplateFailed("Failed to edit template"));
            }
        }).catch((error) => {
            console.error(error);
            dispatch(editTemplateFailed("Failed to edit template"));
        });
    }
}

export function removeTemplate(templateId, token) {
    return dispatch => {
        let requestObject = {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        return fetch(templatesPath + "/" + templateId, requestObject).then((response) => {
            if (response.ok) {
                dispatch(getTechnologies(token));
                dispatch(getTemplates(token));

                dispatch(removeTemplateSuccess());
            } else {
                console.error(response);
                dispatch(removeTemplateFailed("Failed to remove template"));
            }
        }).catch((error) => {
            console.error(error);
            dispatch(removeTemplateFailed("Failed to remove template"));
        });
    }
}

// Action creators

export function getTechnologiesSuccess(technologies) {
    return {
        type: GET_TECHNOLOGIES_SUCCESS,
        technologies: technologies
    }
}

export function getTechnologiesFailed(error) {
    return {
        type: GET_TECHNOLOGIES_FAILED,
        error: error
    }
}

export function getTemplatesSuccess(templates) {
    return {
        type: GET_TEMPLATES_SUCCESS,
        templates: templates
    }
}

export function getTemplatesFailed(error) {
    return {
        type: GET_TEMPLATES_FAILED,
        error: error
    }
}

export function createTemplateSuccess() {
    return {
        type: CREATE_TEMPLATE_SUCCESS
    }
}

export function createTemplateFailed(error) {
    return {
        type: CREATE_TEMPLATE_FAILED,
        error: error
    }
}

export function editTemplateSuccess() {
    return {
        type: EDIT_TEMPLATE_SUCCESS
    }
}

export function editTemplateFailed(error) {
    return {
        type: EDIT_TEMPLATE_FAILED,
        error: error
    }
}

export function removeTemplateSuccess() {
    return {
        type: REMOVE_TEMPLATE_SUCCESS
    }
}

export function removeTemplateFailed(error) {
    return {
        type: REMOVE_TEMPLATE_FAILED,
        error: error
    }
}
