import React, { Component } from 'react';
import './App.css';

import { withRouter } from 'react-router-dom';

import Main from './components/Main';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogged: false,
            token: "",
            user: "",
            technologies: ["Java", "React", "AngularJS", "CSS"],
            templates: [
                {
                    technology: "React",
                    name: "React Template 1"
                }, {
                    technology: "React",
                    name: "React Template 2"
                }, {
                    technology: "Java",
                    name: "Java Template 1"
                }, {
                    technology: "Java",
                    name: "Java Template 2"
                }, {
                    technology: "AngularJS",
                    name: "AngularJS Template 1"
                }, {
                    technology: "AngularJS",
                    name: "AngularJS Template 2"
                }, {
                    technology: "CSS",
                    name: "CSS Template 1"
                }, {
                    technology: "CSS",
                    name: "CSS Template 2"
                },
            ]
        };

        this.tasksPath = "/api/templates";
    }

    componentDidMount() {
        let isLogged = sessionStorage.getItem("isLogged") === "true";
        let token = sessionStorage.getItem("token");
        let user = sessionStorage.getItem("user");

        this.setState({
            user: user
        });

        if (isLogged) {
            this.checkToken(token);

            // TODO: Get technologies
            // TODO: Get templates
        }
    }

    setSessionStorage = (isLogged, token, user) => {
        sessionStorage.setItem("isLogged", isLogged);
        sessionStorage.setItem("token", token);

        if (user) {
            sessionStorage.setItem("user", user);
        }
    }

    register = (user) => {
        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }
        fetch("/register", requestObject).then((response) => {
            if (response.ok) {
                alert("Registered");
            } else if (response.status === 409) {
                alert("Username already exists");
            } else if (response.status === 403) {
                console.log(response);
                alert(response.message);
            } else {
                console.error("Error: " + response.status);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    login = (user) => {
        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }
        fetch("/login", requestObject).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({
                        isLogged: true,
                        token: data.token,
                        user: user.username
                    });

                    this.setSessionStorage(true, data.token, user.username);

                    // TODO: Get technologies
                    // TODO: Get templates

                    // TODO: Redirect to main view
                });
            } else if (response.status === 403) {
                alert("Wrong username or password");
            } else {
                console.error("Error: " + response.status);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    logout = () => {
        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": this.state.token
            }
        }
        fetch("/logout", requestObject).then((response) => {
            if (response.ok) {
                this.setState({
                    isLogged: false,
                    token: ""
                });

                this.setSessionStorage(false, "", "");
            } else if (response.status === 404) {
                alert("Not found");
            } else {
                console.error("Error: " + response.status);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    checkToken = (token) => {
        if (!token) {
            token = this.state.token;
        }

        let requestObject = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        fetch("/checktoken", requestObject).then((response) => {
            if (response.ok) {
                this.setState({
                    isLogged: true,
                    token: token
                });

                this.setSessionStorage(true, this.state.token);
            } else if (response.status === 404) {
                this.setState({
                    isLogged: false,
                    token: ""
                });

                this.setSessionStorage(false, "", "");
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
                    register={this.register}
                    login={this.login}
                    isLogged={this.state.isLogged}
                    user={this.state.user}
                    technologies={this.state.technologies}
                    templates={this.state.templates}
                />
            </div>
        );
    }
}

export default withRouter(App);
