import React from 'react';

import './LoginForm.css';

import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { onLogin, onRegister } from '../../actions/loginActions';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.defaultState = {
            username: "",
            password: ""
        };

        this.state = this.defaultState;
    }

    onChange = (event) => {
        if (event.target.name === "username") {
            this.setState({
                username: event.target.value
            });
        }

        if (event.target.name === "password") {
            this.setState({
                password: event.target.value
            });
        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        if (event.target.name === "register") {
            this.props.dispatch(onRegister(user));
        } else {
            this.props.dispatch(onLogin(user));
        }

        this.setState(this.defaultState);
    }

    render() {
        return (
            <div className="login">
                <div className="login-title">Login</div>
                <Form className="login-form">
                    <Form.Field>
                        <label className="login-label">Username: </label>
                        <input
                            className="normal-input"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label className="login-label">Password: </label>
                        <input
                            className="normal-input"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </Form.Field>

                    <Button className="normal-button login-button" onClick={this.onSubmit} name="login">Login</Button>
                    <Button className="normal-button login-button" onClick={this.onSubmit} name="register">Register</Button>
                </Form>

                <div className="error-message">{this.props.error}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.login.error
    }
}

export default connect(mapStateToProps)(LoginForm);