import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Input from './components/Input';
import Layout2 from './components/Layout2';
import Layout3 from './components/Layout3';
import Layout4 from './components/Layout4';
import './Custom.scss';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Input} />
        <Route exact path="/Layout2" component={Layout2} />
        <Route exact path="/Layout3" component={Layout3} />
        <Route path="/Layout4" component={Layout4} />
      </Router>
    );
  }
}

export default App;
