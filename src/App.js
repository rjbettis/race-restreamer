import React, { Component, Container } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Input from './components/Input';
import RaceLayout from './components/RaceLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Input} />
        <Route exact path="/RaceLayout" component={RaceLayout} />
      </Router>
    );
  }
}

export default App;
