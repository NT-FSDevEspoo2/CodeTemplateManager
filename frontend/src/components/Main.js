import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';
import Home from './Home';

export default class Main extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (
                    !this.props.isLogged ? (
                        <LoginForm
                            register={this.props.register}
                            login={this.props.login}
                        />
                    ) : (
                            <Redirect to="/home"></Redirect>
                        )
                )} />

                <Route exact path="/home" render={() => (
                    this.props.isLogged ? (
                        <Home
                            user={this.props.user}
                            technologies={this.props.technologies}
                            templates={this.props.templates}
                        />
                    ) : (
                            <Redirect to="/"></Redirect>
                        )
                )} />
            </Switch>
        );
    }
}