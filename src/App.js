import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Player from './components/Player';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      racerOne: 'retrocommunity',
      racerTwo: 'retrocommunity',
      racerThree: 'retrocommunity',
      racerFour: 'retrocommunity',
      streamOne: 'retrocommunity',
      settings: {
        volume: '0.5',
        lowQuality: '360p30',
        highQuality: 'chunked',
      },
    };

    this.racerOne = this.racerOne.bind(this);
    this.racerTwo = this.racerTwo.bind(this);
    this.racerThree = this.racerThree.bind(this);
    this.racerFour = this.racerFour.bind(this);
  }

  racerOne(channel) {
    this.setState({ streamOne: this.state.racerOne });
  }

  racerTwo(channel) {
    this.setState({ streamOne: this.state.racerTwo });
  }

  racerThree(channel) {
    this.setState({ streamOne: this.state.racerThree });
  }

  racerFour(channel) {
    this.setState({ streamOne: this.state.racerFour });
  }

  render() {
    return (
      <Container>
        <Player
          key={this.state.streamOne}
          channel={this.state.streamOne}
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
