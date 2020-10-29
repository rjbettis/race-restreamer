import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Input from './components/Input';
import TwoStreamLayout from './components/TwoStreamLayout';
import ThreeStreamLayout from './components/ThreeStreamLayout';
import FourStreamLayout from './components/FourStreamLayout';
import FourStreamLayoutNoBtn from './components/FourStreamLayoutNoBtn';
import ThreeStreamLayoutNoBtn from './components/ThreeStreamLayoutNoBtn';
import TwoStreamLayoutNoBtn from './components/TwoStreamLayoutNoBtn';
import TwitchAuth from './components/TwitchAuth';
import './Custom.scss';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container fluid={true} className="no-padding">
        <Router>
          <Route exact path="/" component={Input} />
          <Route exact path="/TwoStreamLayout" component={TwoStreamLayout} />
          <Route
            exact
            path="/ThreeStreamLayout"
            component={ThreeStreamLayout}
          />
          <Route exact path="/FourStreamLayout" component={FourStreamLayout} />
          <Route
            exact
            path="/FourStreamLayoutNoBtn"
            component={FourStreamLayoutNoBtn}
          />
          <Route
            exact
            path="/ThreeStreamLayoutNoBtn"
            component={ThreeStreamLayoutNoBtn}
          />
          <Route
            exact
            path="/TwoStreamLayoutNoBtn"
            component={TwoStreamLayoutNoBtn}
          />
          <Route exact path="/TwitchAuth" component={TwitchAuth} />
        </Router>
      </Container>
    );
  }
}

export default App;
