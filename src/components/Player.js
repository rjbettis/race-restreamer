import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import SwapBtn from './SwapBtn';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
    };
  }

  componentDidMount() {
    var options = {
      width: 533,
      height: 300,
      channel: this.props.channel,
    };
    var player = new window.Twitch.Player(this.props.channel, options);
    player.setVolume(this.props.settings.volume);
    player.setQuality(this.props.settings.lowQuality);
    player.setMuted(true);
    player.disableCaptions();

    //this.setState({ player: player });
  }
  render() {
    return (
      <Container className="stream" id={this.props.channel}>
        <SwapBtn
          id={this.props.channel}
          action="Remove"
          racerOne={this.props.racerOne}
          racerTwo={this.props.racerTwo}
          racerThree={this.props.racerThree}
          racerFour={this.props.racerFour}
        />
      </Container>
    );
  }
}

export default Player;
