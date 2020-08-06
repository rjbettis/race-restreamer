import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class PlayerNoButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStreams: this.props.activeStreams,
    };
  }

  componentDidMount() {
    var options;
    let height = this.props.windowHeight / 2;
    let width = height * (16 / 9);

    options = {
      width: width,
      height: height,
      channel: this.props.streamName,
      muted: true,
    };

    this.player = new window.Twitch.Player(this.props.streamName, options);
  }

  render() {
    return (
      <Container
        fluid={true}
        style={{ height: this.props.windowHeight / 2 }}
        className="no-padding no-margin blue"
        id={this.props.streamName}
      />
    );
  }
}

export default PlayerNoButtons;
