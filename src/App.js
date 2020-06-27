import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Input from './components/Input';
import RaceLayoutTwo from './components/RaceLayoutTwo';
import RaceLayoutThree from './components/RaceLayoutThree';
import RaceLayoutFour from './components/RaceLayoutFour';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Input} />
        <Route exact path="/RaceLayoutTwo" component={RaceLayoutTwo} />
        <Route exact path="/RaceLayoutThree" component={RaceLayoutThree} />
        <Route exact path="/RaceLayoutFour" component={RaceLayoutFour} />
      </Router>
    );
  }
}

export default App;
