import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Input from './components/Input';
import Layout2 from './components/Layout2';
import Layout3 from './components/Layout3';
import Layout4 from './components/Layout4';
import Layout4NoButtons from './components/Layout4NoButtons';
import Layout3NoButtons from './components/Layout3NoButtons';
import Layout2NoButtons from './components/Layout2NoButtons';
import './Custom.scss';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container fluid={true} className="no-padding">
        <Router>
          <Route exact path="/" component={Input} />
          <Route exact path="/Layout2" component={Layout2} />
          <Route exact path="/Layout3" component={Layout3} />
          <Route path="/Layout4" component={Layout4} />
          <Route path="/Layout4NoButtons" component={Layout4NoButtons} />
          <Route path="/Layout3NoButtons" component={Layout3NoButtons} />
          <Route path="/Layout2NoButtons" component={Layout2NoButtons} />
        </Router>
      </Container>
    );
  }
}

export default App;
