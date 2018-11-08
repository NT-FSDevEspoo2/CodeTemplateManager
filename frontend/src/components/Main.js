import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginForm from './LoginForm';
import Home from './Home/Home';

export default class Main extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (
                    !this.props.isLogged ? (
                        <LoginForm
                        />
                    ) : (
                            <Redirect to="/home"></Redirect>
                        )
                )} />

                <Route exact path="/home" render={() => (
                    this.props.isLogged ? (
                        <Home
                        />
                    ) : (
                            <Redirect to="/"></Redirect>
                        )
                )} />
            </Switch>
        );
    }
}