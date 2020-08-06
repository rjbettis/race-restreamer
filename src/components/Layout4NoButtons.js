import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PlayerNoButtons from './PlayerNoButtons';

class Layout4NoButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamOne: this.parseQueryString()[0],
      streamTwo: this.parseQueryString()[1],
      streamThree: this.parseQueryString()[2],
      streamFour: this.parseQueryString()[3],
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  parseQueryString() {
    let query = this.props.location.search;
    query = query.replace('?streams=', '');
    query = query.split(',');
    return query;
  }

  render() {
    return (
      <Container fluid={true} className="no-padding no-margin yellow">
        <Row
          className="no-margin yellow"
          style={{
            height: this.state.height / 2,
          }}
        >
          <Col
            className="no-padding no-margin yellow"
            style={{
              height: this.state.height / 2,
            }}
          >
            <Container fluid={true} className="no-padding no-margin yellow">
              <PlayerNoButtons
                className="no-padding no-margin yellow"
                streamName={this.state.streamOne}
                windowWidth={this.state.width}
                windowHeight={this.state.height}
              />
            </Container>
          </Col>
          <Col
            className="no-padding no-margin yellow"
            style={{
              height: this.state.height / 2,
            }}
          >
            <Container fluid={true} className="no-padding no-margin yellow">
              <PlayerNoButtons
                className="no-padding no-margin yellow"
                streamName={this.state.streamTwo}
                activeStreams={this.state.activeStreams}
                windowHeight={this.state.height}
              />
            </Container>
          </Col>
        </Row>
        <Row
          className="no-margin yellow"
          style={{
            height: this.state.height / 2,
          }}
        >
          <Col
            className="no-padding no-margin yellow"
            style={{
              height: this.state.height / 2,
            }}
          >
            <Container fluid={true} className="no-padding no-margin yellow">
              <PlayerNoButtons
                className="no-padding no-margin"
                streamName={this.state.streamThree}
                activeStreams={this.state.activeStreams}
                windowHeight={this.state.height}
              />
            </Container>
          </Col>
          <Col
            className="no-padding no-margin yellow"
            style={{
              height: this.state.height / 2,
            }}
          >
            <Container fluid={true} className="no-padding no-margin yellow">
              <PlayerNoButtons
                className="no-padding no-margin yellow"
                streamName={this.state.streamFour}
                activeStreams={this.state.activeStreams}
                windowHeight={this.state.height}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Layout4NoButtons;
