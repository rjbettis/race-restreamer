import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Player from './Player';
import update from 'immutability-helper';

class RaceLayoutFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      racers: this.props.location.state.validChannels,
      streamOne: this.props.location.state.validChannels[0],
      streamTwo: this.props.location.state.validChannels[1],
      streamThree: this.props.location.state.validChannels[2],
      streamFour: this.props.location.state.validChannels[3],
      activeStreams: [0, 1, 2, 3],
      height: window.innerHeight,
      width: window.innerWidth,
    };

    this.changeRacer = this.changeRacer.bind(this);
  }

  changeRacer(racer, streamNum, racerIndex) {
    if (
      streamNum === '1' &&
      racer !== this.state.streamTwo &&
      racer !== this.state.streamThree &&
      racer !== this.state.streamFour
    ) {
      this.setState({
        streamOne: racer,
        activeStreams: update(this.state.activeStreams, {
          0: { $set: racerIndex },
        }),
      });
    } else if (
      streamNum === '2' &&
      racer !== this.state.streamOne &&
      racer !== this.state.streamThree &&
      racer !== this.state.streamFour
    ) {
      this.setState({
        streamTwo: racer,
        activeStreams: update(this.state.activeStreams, {
          1: { $set: racerIndex },
        }),
      });
    } else if (
      streamNum === '3' &&
      racer !== this.state.streamOne &&
      racer !== this.state.streamTwo &&
      racer !== this.state.streamFour
    ) {
      this.setState({
        streamThree: racer,
        activeStreams: update(this.state.activeStreams, {
          2: { $set: racerIndex },
        }),
      });
    } else if (
      streamNum === '4' &&
      racer !== this.state.streamOne &&
      racer !== this.state.streamTwo &&
      racer !== this.state.streamThree
    ) {
      this.setState({
        streamFour: racer,
        activeStreams: update(this.state.activeStreams, {
          3: { $set: racerIndex },
        }),
      });
    }
  }

  render() {
    var width = window.innerWidth;
    console.log(width);
    var height = window.innerHeight;
    console.log(height);
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <Container className="zeroPaddingMarigin">
              <Player
                key={this.state.streamOne}
                streamNum="1"
                streamName={this.state.streamOne}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
                windowWidth={this.state.width}
                windowHeight={this.state.height}
              />
            </Container>
          </Col>
          <Col>
            <Container className="zeroPaddingMarigin">
              <Player
                key={this.state.streamTwo}
                streamNum="2"
                streamName={this.state.streamTwo}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
                windowWidth={this.state.width}
                windowHeight={this.state.height}
              />
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className="zeroPaddingMarigin">
              <Player
                key={this.state.streamThree}
                streamNum="3"
                streamName={this.state.streamThree}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
                windowWidth={this.state.width}
                windowHeight={this.state.height}
              />
            </Container>
          </Col>
          <Col>
            <Container className="zeroPaddingMarigin">
              <Player
                key={this.state.streamFour}
                streamNum="4"
                streamName={this.state.streamFour}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
                windowWidth={this.state.width}
                windowHeight={this.state.height}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RaceLayoutFour;
