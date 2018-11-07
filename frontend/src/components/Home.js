import React from 'react';

import Sidebar from './Sidebar/Sidebar';
import Template from './Template/Template';
import { connect } from 'react-redux';

import { createTemplate, editTemplate, removeTemplate } from '../actions/templateActions';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTemplate: null,
            formMode: false
        };
    }

    selectTemplate = (template) => {
        this.setState({
            selectedTemplate: template,
            formMode: false
        });
    }

    setFormMode = (mode, template) => {
        if (!this.state.formMode) {
            this.setState({
                formMode: mode,
                selectedTemplate: template
            });
        }
    }

    createTemplate = (template) => {
        this.props.dispatch(createTemplate(template, this.props.token));

        this.setState({
            formMode: false
        });

        this.selectTemplate(template);
    }

    editTemplate = (template) => {
        this.props.dispatch(editTemplate(template, this.props.token));

        this.setState({
            formMode: false
        });

        this.selectTemplate(template);
    }

    removeTemplate = (id) => {
        if (this.state.formMode) {
            return;
        }

        console.log("Confirmed remove action");
        this.props.dispatch(removeTemplate(id, this.props.token));

        this.selectTemplate(null);
    }

    render() {
        return (
            <div>
                <Sidebar
                    selectTemplate={this.selectTemplate}
                    selectedTemplate={this.state.selectedTemplate}
                    setFormMode={this.setFormMode}
                    formMode={this.state.formMode}
                    removeTemplate={this.removeTemplate}
                />
                <div>You are logged in as {this.props.username}</div>

                <Template
                    selectTemplate={this.selectTemplate}
                    selectedTemplate={this.state.selectedTemplate}
                    formMode={this.state.formMode}
                    createTemplate={this.createTemplate}
                    editTemplate={this.editTemplate}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.login.username,
        token: state.login.token
    }
}

export default connect(mapStateToProps)(Home);