import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SwapBtns from './SwapBtns';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
    };
  }

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
      <Container>
        <Row>
          <Col>
            {this.props.streamName}
            <SwapBtns
              streamNum={this.props.streamNum}
              streamName={this.props.streamName}
              changeRacer={this.props.changeRacer}
              racers={this.props.racers}
            />

            <Container className="stream" id={this.props.streamName} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Player;
