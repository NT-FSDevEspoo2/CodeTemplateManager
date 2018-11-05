import React from 'react';

import Sidebar from './Sidebar/Sidebar';
import Template from './Template/Template';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTemplate: null
        };
    }

    selectTemplate = (template) => {
        this.setState({
            selectedTemplate: template
        });
    }

    render() {
        return (
            <div>
                <Sidebar
                    technologies={this.props.technologies}
                    templates={this.props.templates}
                    selectTemplate={this.selectTemplate}
                    selectedTemplate={this.state.selectedTemplate}
                />
                <div>You are logged in as {this.props.user}</div>

                <Template
                    selectedTemplate={this.state.selectedTemplate}
                />
            </div>
        );
    }
}