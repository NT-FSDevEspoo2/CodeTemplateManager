import React from 'react';

import Sidebar from './Sidebar/Sidebar';
import Template from './Template/Template';
import { connect } from 'react-redux';

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
        this.props.createTemplate(template);

        this.setState({
            formMode: false
        });

        this.selectTemplate(template);
    }

    editTemplate = (template) => {
        this.props.editTemplate(template);

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
        this.props.removeTemplate(id);

        this.selectTemplate(null);
    }

    render() {
        return (
            <div>
                <Sidebar
                    technologies={this.props.technologies}
                    templates={this.props.templates}
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
        username: state.login.username
    }
}

export default connect(mapStateToProps)(Home);