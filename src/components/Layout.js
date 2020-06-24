import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Player from './Player';
import update from 'immutability-helper';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      racers: [
        'grandpoobear',
        'dode',
        'andrewg',
        'pedrothelion',
        'petedorr',
        'endyswe',
        'the_widdler',
        'linkdeadx2',
        'hayesmaker64',
      ],
      streamOne: 'grandpoobear',
      streamTwo: 'dode',
      streamThree: 'andrewg',
      streamFour: 'pedrothelion',
      activeStreams: [0, 1, 2, 3],
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
    return (
      <React.Fragment>
        <Row>
          <Col>
            <React.Fragment>
              <Player
                key={this.state.streamOne}
                streamNum="1"
                streamName={this.state.streamOne}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
              />
            </React.Fragment>
          </Col>
          <Col>
            <React.Fragment>
              <Player
                key={this.state.streamTwo}
                streamNum="2"
                streamName={this.state.streamTwo}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
              />
            </React.Fragment>
          </Col>
        </Row>
        <Row>
          <Col>
            <React.Fragment>
              <Player
                key={this.state.streamThree}
                streamNum="3"
                streamName={this.state.streamThree}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
              />
            </React.Fragment>
          </Col>
          <Col>
            <React.Fragment>
              <Player
                key={this.state.streamFour}
                streamNum="4"
                streamName={this.state.streamFour}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
              />
            </React.Fragment>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Layout;
