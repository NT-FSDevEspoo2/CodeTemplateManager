import React from 'react';

export default class Template extends React.Component {

    render() {
        let template;

        if (this.props.selectedTemplate) {
            template = <div>Selected template: {this.props.selectedTemplate.name}</div>;
        } else {
            template = <div>Selected template: None</div>;
        }

        return (
            <div>
                {template}
            </div>
        );
    }
}