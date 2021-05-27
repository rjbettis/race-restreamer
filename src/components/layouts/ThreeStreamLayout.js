import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Player from '../players/Player';
import update from 'immutability-helper';

class ThreeStreamLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      racers: this.parseQueryString(),
      streamOne: this.parseQueryString()[0],
      streamTwo: this.parseQueryString()[1],
      streamThree: this.parseQueryString()[2],
      activeStreams: [0, 1, 2],
    };

    this.changeRacer = this.changeRacer.bind(this);
  }

  parseQueryString() {
    let query = this.props.location.search;
    query = query.replace('?streams=', '');
    query = query.split(',');
    return query;
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
    }
  }

  render() {
    var width = window.innerWidth;
    console.log(width);
    var height = window.innerHeight;
    console.log(height);

    return (
      <Container fluid={true}>
        <Row xl={2}>
          <Col xl={6}>
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
                layout={3}
              />
            </Container>
          </Col>
          <Col xl={6}>
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
                layout={3}
              />
            </Container>
          </Col>
        </Row>
        <Row xl={2} className="justify-content-md-center">
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
                layout={3}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ThreeStreamLayout;
