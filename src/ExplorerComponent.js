import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import axios from 'axios';
import JSONPretty from 'react-json-pretty';
import './ExplorerComponent.scss';

class ExplorerComponent extends Component {
    state = {
        email: '',
        fullName: '',
        phoneNumber: '',
        response: null
    };

    async handleSubmit(event) {
        event.preventDefault();
        const { method, url } = this.props;

        let response;
        switch (method) {
            case 'post': 
                response = await axios.post(url, _.omit(this.state, 'response'));
                break;
            default: 
                response = await axios.get(url);
                break;
        }

        this.setState({ response: response.data });
    };

    handleChange(key, event) {
        this.setState({[key]: event.target.value});
    }

    renderForm() {
        const { method } = this.props;
        const { fullName, email, phoneNumber } = this.state;
        if (method !== 'post') return null;

        return (
            <div className="form-container">
                <span>Body</span>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="text" 
                            value={email}
                            onChange={(event) => this.handleChange('email', event)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Full Name<span className="required">*</span></label>
                        <input 
                            type="text"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(event) => this.handleChange('fullName', event)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input 
                            type="number"
                            value={phoneNumber}
                            onChange={(event) => this.handleChange('phoneNumber', event)} 
                        />
                    </div>
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
        const { title, method, url, body } = this.props;

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
    method: PropTypes.string.isRequired
    // body: PropTypes.arrayOf(PropTypes.Object)
};

export default ExplorerComponent;
