import React from 'react';

import Sidebar from './Sidebar/Sidebar';

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
        let template;

        if (this.state.selectedTemplate) {
            template = <div>Selected template: {this.state.selectedTemplate.name}</div>;
        } else {
            template = <div>Selected template: None</div>;
        }

        return (
            <div>
                <Sidebar
                    technologies={this.props.technologies}
                    templates={this.props.templates}
                    selectTemplate={this.selectTemplate}
                />
                <div>You are logged in as {this.props.user}</div>

                {template}
            </div>
        );
    }
}