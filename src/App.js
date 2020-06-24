import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Layout />
      </Container>
    );
  }
}

export default App;
