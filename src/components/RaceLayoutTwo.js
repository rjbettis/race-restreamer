import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Player from './Player';
import update from 'immutability-helper';

class RaceLayoutFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      racers: this.props.location.state.channelList,
      streamOne: this.props.location.state.channelList[0],
      streamTwo: this.props.location.state.channelList[1],
      activeStreams: [0, 1],
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
    }
  }

  render() {
    return (
      <Container fluid={true} className="zeroPadding">
        <Row xl={2}>
          <Col xl={6}>
            <Container fluid={true} className="zeroPadding playerMargin">
              <Player
                key={this.state.streamOne}
                streamNum="1"
                streamName={this.state.streamOne}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
              />
            </Container>
          </Col>
          <Col xl={6}>
            <Container fluid={true} className="zeroPadding playerMargin">
              <Player
                key={this.state.streamTwo}
                streamNum="2"
                streamName={this.state.streamTwo}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RaceLayoutFour;
