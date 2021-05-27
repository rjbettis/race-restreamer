import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class PlayerNoButtonsWidthDependent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStreams: this.props.activeStreams,
    };
  }

  componentDidMount() {
    var options;
    let width = Math.round(this.props.windowWidth / 2);
    let height = width * (9 / 16);

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

export default PlayerNoButtonsWidthDependent;
