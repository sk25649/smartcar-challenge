import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';
import './ExplorerComponent.scss';

const FormGroup = ({ type, value, label, onChange}) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input 
                type="text" 
                value={value}
                onChange={(event) => onChange(label, event)} 
            />
        </div>
    );
};

class ExplorerComponent extends Component {
    state = {
        formValues: {},
        response: null
    };

    async handleSubmit(event) {
        event.preventDefault();
        const { method, url } = this.props;

        let response;
        switch (method) {
            case 'post': 
                response = await axios.post(url, this.state.formValues);
                break;
            default: 
                response = await axios.get(url);
                break;
        }

        this.setState({ response: response.data });
    };

    handleChange(key, event) {
        this.setState({ 
            formValues: {
                ...this.state.formValues, 
                [key]: event.target.value
            }
        });
    }

    renderFormGroups() {
        const { body } = this.props;
        return body.map(({ type, name }) => {
            const value = this.state[name];
            return (
                <FormGroup
                    id={name}
                    type={type}
                    label={name}
                    onChange={this.handleChange}
                    value={value}
                />
            );
        });

    }

    renderForm() {
        const { method, body } = this.props;
        if (method !== 'post') {
            return (
                <button 
                    type="submit" 
                    onClick={(event) => this.handleSubmit(event)}
                >
                    Submit request 
                </button>
            );
        };

        return (
            <div className="form-container">
                <span>Body</span>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    {this.renderFormGroups()}                   
                    <input type="submit" value="Send request" />
                </form>
            </div>
        );
    }

    renderResponse() {
        if (!this.state.response) return null;
        return <JSONPretty id="json-pretty" json={this.state.response}></JSONPretty>;
    }

    render() {
        const { title, method, url } = this.props;

        return (
            <div className="container">
                <span className="title">{title}</span>
                <div className="request-container">
                    <span className="methodName">{method}</span>
                    <span>Base URL</span>
                    <span className="url">{url}</span>
                </div>
                {this.renderForm()}
                <div className="response-container">
                    <span>Response</span>
                    <div className="response">
                        {this.renderResponse()}
                    </div>
                </div>
            </div>
        );
    }
}

ExplorerComponent.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    body: PropTypes.arrayOf(PropTypes.Object)
};

export default ExplorerComponent;
