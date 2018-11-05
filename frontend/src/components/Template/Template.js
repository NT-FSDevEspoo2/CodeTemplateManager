import React from 'react';

import './Template.css';

import SyntaxHighlighter from 'react-syntax-highlighter';

export default class Template extends React.Component {

    render() {
        let selectedTemplate = this.props.selectedTemplate;

        let selectedTemplateName = this.props.selectedTemplate ? selectedTemplate.name : "None";

        let code = <div></div>;
        if (selectedTemplate && selectedTemplate.code) {
            code = <div><SyntaxHighlighter language='javascript' className="code">{selectedTemplate.code}</SyntaxHighlighter></div>;
        }

        let template = (
            <div>
                <div>Selected template: {selectedTemplateName}</div>
                {code}
            </div>
        );

        return (
            <div>
                {template}
            </div>
        );
    }
}