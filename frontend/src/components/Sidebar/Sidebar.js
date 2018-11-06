import React from 'react';

import './Sidebar.css';

import Arrow from './arrow.png';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTechnologies: []
        }
    }

    selectTechnology = (technology) => {
        let selectedTechnologies = this.state.selectedTechnologies;

        let deselected = false;
        for (let i = 0; i < selectedTechnologies.length; i++) {
            let selectedTechnology = selectedTechnologies[i];

            if (selectedTechnology === technology) {
                selectedTechnologies.splice(i, 1);

                deselected = true;
            }
        }

        if (!deselected) {
            selectedTechnologies.push(technology);
        }

        this.setState({
            selectedTechnologies: selectedTechnologies
        });
    }

    render() {
        let technologyList = this.props.technologies.map((technology) => {
            let selected = this.state.selectedTechnologies.includes(technology);

            let arrowIcon;
            if (selected) {
                arrowIcon = <img className="arrow down" src={Arrow} alt=">" />;
            } else {
                arrowIcon = <img className="arrow" src={Arrow} alt="-" />;
            }

            let templateList;
            if (selected) {
                if (this.props.templates.length > 0) {
                    templateList = this.props.templates.map((template) => {
                        if (template.technology !== technology) {
                            return (null);
                        }

                        let templateStyle;
                        if (this.props.selectedTemplate) {
                            if (template.name === this.props.selectedTemplate.name) {
                                templateStyle = {
                                    color: "#3a85ff"
                                };
                            }
                        }

                        return (
                            <div key={template.name} style={templateStyle} onClick={() => this.props.selectTemplate(template)}>{template.name}</div>
                        )
                    });
                } else {
                    templateList = <div className="greyed">Empty</div>;
                }
            }

            return (
                <div key={technology} className="technology unselectable">
                    <div onClick={() => this.selectTechnology(technology)}>{arrowIcon}{technology}</div>
                    <div className="templates">{templateList}</div>
                </div>
            )
        });

        let formModeButtonClassName = "sidebar-control-button";

        if (this.props.formMode) {
            formModeButtonClassName += " sidebar-control-button-disabled";
        }

        let editButton = null;
        let removeButton = null;
        if (this.props.selectedTemplate) {
            editButton = (
                <div className={formModeButtonClassName}
                    onClick={() => this.props.setFormMode(true, this.props.selectedTemplate)}
                >
                    <span className="sidebar-control-button-text unselectable">Edit</span>
                </div>
            );

            removeButton = (
                <div className={formModeButtonClassName}
                    onClick={() => this.props.removeTemplate(this.props.selectedTemplate._id)}
                >
                    <span className="sidebar-control-button-text unselectable">Remove</span>
                </div>
            );
        }

        return (
            <div className="sidebar">
                <div className="sidebar-title" onClick={() => this.props.selectTemplate(null)}>Code Templates</div>

                <div className="sidebar-controls">
                    <div className={formModeButtonClassName}
                        disabled={this.props.formMode} 
                        onClick={() => this.props.setFormMode(true, null)}
                    >
                        <span className="sidebar-control-button-text unselectable">Create</span>
                    </div>
                    {editButton}
                    {removeButton}
                </div>
                <div className="technologies">
                    {technologyList}
                </div>
            </div>
        );
    }
}