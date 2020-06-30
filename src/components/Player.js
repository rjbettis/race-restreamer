import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
//import SwapBtns from './SwapBtns';
//import withSizes from 'react-sizes';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSt1ams: this.props.activeStreams,
    };
  }

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
    } else if (this.props.racers.length > 3) {
      if (this.props.streamNum === '1') {
        options = {
          width: (this.props.windowWidth / 2) * 0.733333333,
          height: (this.props.windowHeight / 2) * 0.863121186,
          channel: this.props.streamName,
        };
      } else {
        options = {
          width: (this.props.windowWidth / 2) * 0.733333333,
          height: (this.props.windowHeight / 2) * 0.863121186,
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
    this.props.changeRacer(racer, this.props.streamNum, racerIndex);
  }

  render() {
    return (
      <Container className="zeroPaddingMarigin">
        {this.props.racers.length === 2 || this.props.racers.length === 3 ? (
          <Row>
            <Col>
              <label className="playerLabel">{this.props.streamName}</label>
              <Container id={this.props.streamName} />
            </Col>
          </Row>
        ) : null}

        {this.props.racers.length > 3 ? (
          <Row xl={2}>
            <Col xl={2}>
              <ToggleButtonGroup
                key={this.state.activeStreams}
                vertical
                className="btn btn-block zeroPadding"
                type="radio"
                name="options"
                defaultValue={this.props.activeStreams}
              >
                {this.props.racers.map((btn, index) => (
                  <ToggleButton
                    className="button"
                    key={index}
                    size="sm"
                    variant="secondary"
                    value={index}
                    onClick={() =>
                      this.changeRacer(
                        this.props.racers[index],
                        this.props.streamNum,
                        this.props.racers.indexOf(this.props.racers[index])
                      )
                    }
                  >
                    {this.props.racers[index]}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Col>
            <Col>
              <label className="playerLabel">{this.props.streamName}</label>
              <Container id={this.props.streamName} />
            </Col>
          </Row>
        ) : null}
      </Container>
    );
  }
}

export default Player;
