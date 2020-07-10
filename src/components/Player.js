import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SwapButtons from './SwapButtons';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStreams: this.props.activeStreams,
    };
  }

  componentDidMount() {
    var options;
    let height = (this.props.windowHeight / 2) * 0.863121186;
    let width = height * (16 / 9);
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
    } else if (this.props.racers.length > 3) {
      if (this.props.streamNum === '1') {
        options = {
          width: width,
          height: height,
          channel: this.props.streamName,
        };
      } else {
        options = {
          width: width,
          height: height,
          channel: this.props.streamName,
          muted: true,
        };
      }
    }

    this.player = new window.Twitch.Player(this.props.streamName, options);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.activeStreams !== nextProps.activeStreams) {
      this.setState({ activeStreams: nextProps.activeStreams });
    }
    return true;
  }

  changeRacer(racer, streamNum, racerIndex) {
    this.props.changeRacer(racer, streamNum, racerIndex);
  }

  render() {
    if (this.props.layout === 2) {
      return (
        <Container className="no-padding">
          <Row xl={2}>
            <Col xl={10}>
              <label className="playerLabel">{this.props.streamName}</label>
              <Container id={this.props.streamName} />
            </Col>
          </Row>
          <Row xl={2}>
            <Col xl={10}>
              <SwapButtons
                activeStreams={this.props.activeStreams}
                racers={this.props.racers}
                streamNum={this.props.streamNum}
                changeRacer={this.props.changeRacer}
              />
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container className="no-padding">
          <Row xl={2}>
            <Col xl={2} className="swap-button-padding-left">
              <SwapButtons
                activeStreams={this.props.activeStreams}
                racers={this.props.racers}
                streamNum={this.props.streamNum}
                changeRacer={this.props.changeRacer}
              />
            </Col>

            <Col xl={10}>
              <label className="playerLabel">{this.props.streamName}</label>
              <Container id={this.props.streamName} />
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default Player;
