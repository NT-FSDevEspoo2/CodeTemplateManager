import React, { Component } from 'react';
import './App.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Main from './components/Main';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            technologies: [],
            templates: []
        };

        this.templatesPath = "/api/templates";
    }

    componentDidMount() {
        if (this.props.isLogged) {
            this.getTechnologies(this.props.token);
            this.getTemplates(this.props.token);
        }
    }

    getTechnologies = (token) => {
        if (!token) {
            token = this.props.token;
        }

        let requestObject = {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        fetch("/api/technologies", requestObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({
                        technologies: data
                    });
                });
            } else {
                console.error("Error: " + response.status);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    getTemplates = (token) => {
        if (!token) {
            token = this.props.token;
        }

        let requestObject = {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        fetch(this.templatesPath, requestObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({
                        templates: data
                    });
                });
            } else {
                console.error("Error: " + response.status);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    createTemplate = (template) => {
        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": this.props.token
            },
            body: JSON.stringify(template)
        }
        fetch(this.templatesPath, requestObject).then((response) => {
            if (response.ok) {
                this.getTemplates();
                this.getTechnologies();
            } else {
                console.error("Error: " + response.status);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    editTemplate = (template) => {
        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": this.props.token
            },
            body: JSON.stringify(template)
        }
        fetch(this.templatesPath + "/" + template.id, requestObject).then((response) => {
            if (response.ok) {
                this.getTemplates();
                this.getTechnologies();
            } else {
                console.error("Error: " + response.status);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    removeTemplate = (id) => {
        let requestObject = {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": this.props.token
            }
        }
        fetch(this.templatesPath + "/" + id, requestObject).then((response) => {
            if (response.ok) {
                this.getTemplates();
                this.getTechnologies();
            } else {
                console.error("Error: " + response.status);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <div className="App">
                <Main
                    isLogged={this.props.isLogged}
                    technologies={this.state.technologies}
                    templates={this.state.templates}
                    createTemplate={this.createTemplate}
                    editTemplate={this.editTemplate}
                    removeTemplate={this.removeTemplate}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.login.isLogged,
        username: state.login.username,
        token: state.login.token
    }
}

export default withRouter(connect(mapStateToProps)(App));
