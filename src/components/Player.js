import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SwapBtns from './SwapBtns';

class Player extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var options = {
      width: 720,
      height: 405,
      channel: this.props.streamName,
      muted: true,
    };

    this.player = new window.Twitch.Player(this.props.streamName, options);
  }
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xl="auto">
            <SwapBtns
              streamNum={this.props.streamNum}
              streamName={this.props.streamName}
              changeRacer={this.props.changeRacer}
              racers={this.props.racers}
              activeStreams={this.props.activeStreams}
            />
          </Col>
          <Col>
            {this.props.streamName}

            <Container className="stream" id={this.props.streamName} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Player;
