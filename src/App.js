import React, { Component } from 'react';
import ExplorerComponent from './ExplorerComponent';
import './App.css';

const body = [
    {
      name: 'email',
      type: 'email',
      max: 24,
      min: 3,
    },
    {
      name: 'full-name',
      type: 'text',
      placeholder: 'John Doe',
      required: true,
    },
    {
      name: 'phone',
      type: 'tel',
      pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
    }
];

const METHODS = {
  POST: 'post',
  GET: 'get'
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <ExplorerComponent
            title="Get Users"
            url="https://jsonplaceholder.typicode.com/users"
            method={METHODS.GET}
        />
      </div>
    );
  }
}

export default App;
