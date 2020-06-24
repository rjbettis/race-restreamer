import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Player from './Player';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      racers: ['glitchcat7', '4davidblue', 'authorblues', 'therenesance'],
      streamOne: 'retrocommunity',
      streamTwo: 'bovinedevine',
      streamThree: '3dohyeah',
      streamFour: 'lewdtube',
    };

    this.changeRacer = this.changeRacer.bind(this);
  }

  changeRacer(racer, streamNum) {
    console.log(streamNum);
    if (
      streamNum === '1' &&
      racer !== this.state.streamTwo &&
      racer !== this.state.streamThree &&
      racer !== this.state.streamFour
    ) {
      this.setState({ streamOne: racer });
    } else if (
      streamNum === '2' &&
      racer !== this.state.streamOne &&
      racer !== this.state.streamThree &&
      racer !== this.state.streamFour
    ) {
      this.setState({ streamTwo: racer });
    } else if (
      streamNum === '3' &&
      racer !== this.state.streamOne &&
      racer !== this.state.streamTwo &&
      racer !== this.state.streamFour
    ) {
      this.setState({ streamThree: racer });
    } else if (
      streamNum === '4' &&
      racer !== this.state.streamOne &&
      racer !== this.state.streamTwo &&
      racer !== this.state.streamThree
    ) {
      this.setState({ streamFour: racer });
    }
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <Container>
              <Player
                key={this.state.streamOne}
                streamNum="1"
                streamName={this.state.streamOne}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
              />
            </Container>
          </Col>
          <Col>
            <Container>
              <Player
                key={this.state.streamTwo}
                streamNum="2"
                streamName={this.state.streamTwo}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
              />
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container>
              <Player
                key={this.state.streamThree}
                streamNum="3"
                streamName={this.state.streamThree}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
              />
            </Container>
          </Col>
          <Col>
            <Container>
              <Player
                key={this.state.streamFour}
                streamNum="4"
                streamName={this.state.streamFour}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Layout;
