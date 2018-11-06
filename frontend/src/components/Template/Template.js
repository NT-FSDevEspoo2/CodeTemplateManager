import React from 'react';

import './Template.css';

import SyntaxHighlighter from 'react-syntax-highlighter';

export default class Template extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            name: "",
            technology: "",
            code: "",
            parameters: []
        }
    }

    static getDerivedStateFromProps(newProps, previousState) {
        let selectedTemplate = newProps.selectedTemplate;
        console.log(newProps);
        console.log(previousState);
        if (selectedTemplate && previousState.id !== selectedTemplate._id) {
            console.log("Set state name: " + selectedTemplate.name);
            return {
                id: selectedTemplate._id,
                name: selectedTemplate.name,
                technology: selectedTemplate.technology,
                code: selectedTemplate.code,
                parameters: selectedTemplate.parameters
            }
        }

        return null;
    }

    onChange = (event) => {
        let tempState = this.state;
        tempState[event.target.name] = event.target.value;
        
        this.setState({
            tempState
        });
    }

    confirmAction = () => {
        // Create template object
        let template = {
            name: this.state.name,
            technology: "",
            code: this.state.code,
            parameters: []
        };
        
        if (this.props.selectedTemplate) {
            template["id"] = this.props.selectedTemplate._id;

            console.log("Confirmed edit action");
            console.log(template);
            this.props.editTemplate(template);
        } else {
            console.log("Confirmed create action");
            console.log(template);
            this.props.createTemplate(template);
        }
    }

    render() {
        let selectedTemplate = this.props.selectedTemplate;
        let selectedTemplateName = selectedTemplate ? selectedTemplate.name : "None";
        let selectedTemplateNameForForm = this.state.name;

        let templateNameElement = <span>Selected template: {selectedTemplateName}</span>;

        let code = this.state.code;

        let codeElement = null;
        if (selectedTemplate && selectedTemplate.code) {
            codeElement = <SyntaxHighlighter language='javascript' className="code">{code}</SyntaxHighlighter>;
        }

        let formControls = null;
        
        if (this.props.formMode) {
            templateNameElement = (
                <span>
                    Selected template: <input type="text" name="name" onChange={this.onChange} value={selectedTemplateNameForForm}/>
                </span>
            );

            codeElement = <textarea name="code" onChange={this.onChange} className="code code-textarea" value={code}></textarea>;

            let confirmButtonValue = selectedTemplate ? "Edit" : "Create";

            formControls = (
                <div>
                    <input type="button" value={confirmButtonValue} onClick={() => this.confirmAction()}/>
                    <input type="button" value="Cancel" onClick={() => this.props.selectTemplate(this.props.selectedTemplate)}/>
                </div>
            );
        }

        let template = (
            <div>
                <div>{templateNameElement}</div>
                <div>{codeElement}</div>
                <div>{formControls}</div>
            </div>
        );

        return (
            <div>
                {template}
            </div>
        );
    }
}