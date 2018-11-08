import React, { Component } from 'react';
import './App.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Main from './components/Main';

import { getTechnologies, getTemplates } from './actions/templateActions';
import { initRequestCompleted } from './actions/loginActions';

class App extends Component {

    componentDidMount() {
        if (this.props.isLogged) {
            this.props.dispatch(getTechnologies(this.props.token));
            this.props.dispatch(getTemplates(this.props.token));
        }
    }

    static getDerivedStateFromProps(newProps, previousState) {
        if (newProps.initRequested) {
            newProps.dispatch(getTechnologies(newProps.token));
            newProps.dispatch(getTemplates(newProps.token));
            newProps.dispatch(initRequestCompleted());
        }
    }

    render() {
        return (
            <div className="App">
                <Main
                    isLogged={this.props.isLogged}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.login.isLogged,
        username: state.login.username,
        token: state.login.token,
        initRequested: state.login.initRequested
    }
}

export default withRouter(connect(mapStateToProps)(App));
