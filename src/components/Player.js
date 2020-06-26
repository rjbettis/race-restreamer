import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SwapBtns from './SwapBtns';

class Player extends Component {
  componentDidMount() {
    var options = {
      width: 640,
      height: 360,
      channel: this.props.streamName,
      muted: true,
    };

    this.player = new window.Twitch.Player(this.props.streamName, options);
  }
  render() {
    return (
      <Container className="zeroPadding">
        <Row>
          <Col xl={3}>
            <SwapBtns
              streamNum={this.props.streamNum}
              streamName={this.props.streamName}
              changeRacer={this.props.changeRacer}
              racers={this.props.racers}
              activeStreams={this.props.activeStreams}
            />
          </Col>
          <Col>
            <label className="playerLabel">{this.props.streamName}</label>
            <Container
              className="stream zeroPadding"
              id={this.props.streamName}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Player;
