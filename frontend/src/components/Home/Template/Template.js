import React from 'react';

import './Template.css';

import SyntaxHighlighter from 'react-syntax-highlighter';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class Template extends React.Component {

    constructor(props) {
        super(props);

        this.defaultState = {
            id: "",
            name: "",
            technology: "",
            code: "",
            parameters: []
        }

        this.state = this.defaultState;
    }

    static getDerivedStateFromProps(newProps, previousState) {
        let selectedTemplate = newProps.selectedTemplate;
        if (selectedTemplate && previousState.id !== selectedTemplate._id) {
            return {
                id: selectedTemplate._id,
                name: selectedTemplate.name,
                technology: selectedTemplate.technology,
                code: selectedTemplate.code,
                parameters: selectedTemplate.parameters,
                copied: false
            }
        }

        if (!selectedTemplate && previousState.id) {
            return {
                id: "",
                name: "",
                technology: "",
                code: "",
                parameters: [],
                copied: false
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
            id: this.state.id,
            name: this.state.name,
            technology: this.state.technology,
            code: this.state.code,
            parameters: []
        };
        
        if (this.props.selectedTemplate) {
            template["id"] = this.props.selectedTemplate._id;

            this.props.editTemplate(template);
        } else {
            this.props.createTemplate(template);
        }

        this.setState(this.defaultState);
    }

    cancelAction = () => {
        this.props.selectTemplate(this.props.selectedTemplate);

        this.setState(this.defaultState);
    }

    render() {
        let selectedTemplate = this.props.selectedTemplate;
        
        let selectedTemplateName = selectedTemplate ? selectedTemplate.name : "None";

        let selectedTemplateTechnology = selectedTemplate ? selectedTemplate.technology : "";

        let templateNameElement = <span>Selected template: {selectedTemplateName}</span>;
        let templateTechnologyElement = <span>Technology: {selectedTemplateTechnology}</span>;

        let code = this.state.code;

        let copyToClipboardButton = null;

        let codeElement = null;
        if (selectedTemplate && selectedTemplate.code) {
            codeElement = <SyntaxHighlighter language='javascript' className="code">{code}</SyntaxHighlighter>;
        
            if (!this.props.formMode) {
                copyToClipboardButton = (
                    <div>
                        <CopyToClipboard
                            text={this.state.code}
                            onCopy={() => this.setState({copied: true})}
                        >
                            <button className="normal-button unselectable">Copy</button>
                        </CopyToClipboard>
                        <div className="copied-text">{this.state.copied ? "Copied" : ""}</div>
                    </div>
                );
            }
        }

        let formControls = null;
        
        if (this.props.formMode) {
            templateNameElement = (
                <span>
                    Selected template: <input type="text" name="name" onChange={this.onChange} value={this.state.name}/>
                </span>
            );

            templateTechnologyElement = (
                <span>
                    Technology: <input type="text" name="technology" onChange={this.onChange} value={this.state.technology}/>
                </span>
            );

            codeElement = <textarea name="code" onChange={this.onChange} className="code code-textarea" value={code}></textarea>;

            let confirmButtonValue = selectedTemplate ? "Edit" : "Create";

            formControls = (
                <div>
                    <input type="button" className="normal-button unselectable" value={confirmButtonValue} onClick={() => this.confirmAction()}/>
                    <input type="button" className="normal-button unselectable" value="Cancel" onClick={this.cancelAction}/>
                </div>
            );
        }

        let template = (
            <div>
                <div>{templateNameElement}</div>
                <div>{templateTechnologyElement}</div>
                <div>{codeElement}</div>
                {copyToClipboardButton}
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