import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Player from './components/Player';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      racerOne: 'glitchcat7',
      racerTwo: 'darbian',
      racerThree: 'authorblues',
      racerFour: 'daikon',
      streamOne: 'glitchcat7',
      streamTwo: 'darbian',
      streamThree: 'authorblues',
      streamFour: 'daikon',
      settings: {
        volume: '0.25',
        lowQuality: '720p',
        highQuality: 'chunked',
      },
    };

    this.racerOne = this.racerOne.bind(this);
    this.racerTwo = this.racerTwo.bind(this);
    this.racerThree = this.racerThree.bind(this);
    this.racerFour = this.racerFour.bind(this);
  }

  racerOne(streamOne) {
    this.setState({ streamOne: this.state.racerOne });
  }

  racerTwo(streamOne) {
    this.setState({ streamOne: this.state.racerTwo });
  }

  racerThree(streamOne) {
    this.setState({ streamOne: this.state.racerThree });
  }

  racerFour(streamOne) {
    this.setState({ streamOne: this.state.racerFour });
  }

  render() {
    return (
      <Container fluid={true}>
        <Player
          key={this.state.streamOne}
          streamOne={this.state.streamOne}
          streamTwo={this.state.streamTwo}
          streamThree={this.state.streamThree}
          streamFour={this.state.streamFour}
          settings={this.state.settings}
          racerOne={this.racerOne}
          racerTwo={this.racerTwo}
          racerThree={this.racerThree}
          racerFour={this.racerFour}
        />
      </Container>
    );
  }
}

export default App;
