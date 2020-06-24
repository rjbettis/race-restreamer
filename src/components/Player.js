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
    var optionsOne = {
      width: 640,
      height: 360,
      channel: this.props.streamOne,
      muted: true,
    };
    var optionsTwo = {
      width: 640,
      height: 360,
      channel: this.props.streamTwo,
      muted: true,
    };
    var optionsThree = {
      width: 640,
      height: 360,
      channel: this.props.streamThree,
      muted: true,
    };
    var optionsFour = {
      width: 640,
      height: 360,
      channel: this.props.streamFour,
      muted: true,
    };

    this.player = new window.Twitch.Player('player1', optionsOne);
    this.player2 = new window.Twitch.Player('player2', optionsTwo);
    this.player3 = new window.Twitch.Player('player3', optionsThree);
    this.player4 = new window.Twitch.Player('player4', optionsFour);
  }
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <SwapBtns
              racerOne={this.props.racerOne}
              racerTwo={this.props.racerTwo}
              racerThree={this.props.racerThree}
              racerFour={this.props.racerFour}
            />
            <Container className="stream" id="player1" />
          </Col>
          <Col>
            <SwapBtns
              racerOne={this.props.racerOne}
              racerTwo={this.props.racerTwo}
              racerThree={this.props.racerThree}
              racerFour={this.props.racerFour}
            />
            <Container className="stream" id="player2" />
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className="stream" id="player3" />
            <SwapBtns
              racerOne={this.props.racerOne}
              racerTwo={this.props.racerTwo}
              racerThree={this.props.racerThree}
              racerFour={this.props.racerFour}
            />
          </Col>
          <Col>
            <Container className="stream" id="player4" />
            <SwapBtns
              racerOne={this.props.racerOne}
              racerTwo={this.props.racerTwo}
              racerThree={this.props.racerThree}
              racerFour={this.props.racerFour}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Player;
