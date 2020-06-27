import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SwapBtns from './SwapBtns';

class Player extends Component {
  componentDidMount() {
    var options;
    if (this.props.racers.length === 2) {
      if (this.props.streamNum === '1') {
        options = {
          width: 864,
          height: 486,
          channel: this.props.streamName,
        };
      } else {
        options = {
          width: 864,
          height: 486,
          channel: this.props.streamName,
          muted: true,
        };
      }
    } else if (this.props.racers.length === 3) {
      if (this.props.streamNum === '1') {
        options = {
          width: 704,
          height: 396,
          channel: this.props.streamName,
        };
      } else {
        options = {
          width: 704,
          height: 396,
          channel: this.props.streamName,
          muted: true,
        };
      }
    } else if (this.props.racers.length === 4) {
      if (this.props.streamNum === '1') {
        options = {
          width: 640,
          height: 360,
          channel: this.props.streamName,
        };
      } else {
        options = {
          width: 640,
          height: 360,
          channel: this.props.streamName,
          muted: true,
        };
      }
    }

    this.player = new window.Twitch.Player(this.props.streamName, options);
  }
  render() {
    return (
      <Container className="zeroPadding">
        {this.props.racers.length === 2 || this.props.racers.length === 3 ? (
          <Row>
            <Col>
              <label className="playerLabel">{this.props.streamName}</label>
              <Container
                className="stream zeroPadding"
                id={this.props.streamName}
              />
            </Col>
          </Row>
        ) : null}

        {this.props.racers.length > 3 ? (
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
        ) : null}
      </Container>
    );
  }
}

export default Player;
