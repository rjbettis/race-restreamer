import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class SwapBtns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStreams: this.props.activeStreams,
    };
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
    return <Container></Container>;
  }
}

export default SwapBtns;
