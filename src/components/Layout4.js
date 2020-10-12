import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Player from './Player';
import update from 'immutability-helper';

class Layout4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      racers: this.parseQueryString(),
      streamOne: this.parseQueryString()[0],
      streamTwo: this.parseQueryString()[1],
      streamThree: this.parseQueryString()[2],
      streamFour: this.parseQueryString()[3],
      activeStreams: [0, 1, 2, 3],
      height: window.innerHeight,
      width: window.innerWidth,
    };

    this.changeRacer = this.changeRacer.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundColor = this.props.location.background;
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

    const backgroundColor = {
      backgroundColor: this.props.location.background,
    };

    const playerLabelStyle = {
      color: this.props.location.fontColor,
      fontWeight: 'bold',
      fontSize: '22px',
    };

    return (
      <Container fluid={true} style={backgroundColor}>
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
                playerLabelStyle={playerLabelStyle}
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
                playerLabelStyle={playerLabelStyle}
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
                playerLabelStyle={playerLabelStyle}
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
                playerLabelStyle={playerLabelStyle}
              />
            </Container>
          </Col>
        </Row>{' '}
      </Container>
    );
  }
}

export default Layout4;
