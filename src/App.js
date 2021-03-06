import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Input from './components/Input';
import TwoStreamLayout from './components/layouts/TwoStreamLayout';
import ThreeStreamLayout from './components/layouts/ThreeStreamLayout';
import FourStreamLayout from './components/layouts/FourStreamLayout';
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
        </Router>
      </Container>
    );
  }
}

export default App;
