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
    let height = Math.round(this.props.windowHeight / 2);
    let width = height * (16 / 9);

    options = {
      width: width,
      height: height,
      channel: this.props.streamName,
      muted: true,
    };

    this.player = new window.Twitch.Player(this.props.streamName, options);

    console.log(height);
  }

  render() {
    return (
      <Container
        fluid={true}
        className="no-padding"
        id={this.props.streamName}
      />
    );
  }
}

export default PlayerNoButtons;
