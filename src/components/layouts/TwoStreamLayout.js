import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Player from '../players/Player';
import update from 'immutability-helper';
import PlayerNoButtonsWidthDependent from '../players/PlayerNoButtonsWidthDependent';

class TwoStreamLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      racers: this.parseQueryString(),
      streamOne: this.parseQueryString()[0],
      streamTwo: this.parseQueryString()[1],
      activeStreams: [0, 1],
      height: window.innerHeight,
      width: window.innerWidth,
    };

    this.changeRacer = this.changeRacer.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = this.props.location.background;

    window.addEventListener('resize', this.updateDimensions);
    document.body.className = 'body-no-button-layout';
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  /*
   * Parse search prop provided by react router
   */
  parseQueryString() {
    let query = this.props.location.search;
    query = query.replace('?streams=', '');
    query = query.split(',');
    return query;
  }

  /*
   * Logic to handle channel switching
   */
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
    //get window size to send to Player component for video sizing
    var width = window.innerWidth;
    console.log(width);
    var height = window.innerHeight;
    console.log(height);

    return this.props.location.btn === true ? (
      <Container fluid={true}>
        <Row xl={2}>
          <Col xl={6}>
            <Container className="zeroPaddingMarigin">
              {/*
               * render left Player component with given parameters
               */}
              <Player
                key={this.state.streamOne}
                streamNum="1"
                streamName={this.state.streamOne}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
                windowWidth={this.state.width}
                windowHeight={this.state.height}
                layout={2}
              />
            </Container>
          </Col>
          <Col xl={6}>
            <Container className="zeroPaddingMarigin">
              {/*
               * render right Player component with given parameters
               */}
              <Player
                key={this.state.streamTwo}
                streamNum="2"
                streamName={this.state.streamTwo}
                racers={this.state.racers}
                changeRacer={this.changeRacer}
                activeStreams={this.state.activeStreams}
                windowWidth={this.state.width}
                windowHeight={this.state.height}
                layout={2}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    ) : (
      <Container fluid={true} className="no-padding">
        <Row className="no-margin">
          <Col className="no-padding">
            <PlayerNoButtonsWidthDependent
              streamName={this.state.streamOne}
              windowWidth={this.state.width}
              windowHeight={this.state.height}
            />
          </Col>
          <Col className="no-padding">
            <PlayerNoButtonsWidthDependent
              streamName={this.state.streamTwo}
              windowWidth={this.state.width}
              windowHeight={this.state.height}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TwoStreamLayout;
