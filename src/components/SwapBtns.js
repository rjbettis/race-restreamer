import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

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
    return (
      <React.Fragment>
        <ToggleButtonGroup
          key={this.state.activeStreams}
          vertical
          className="btn btn-block zero-padding"
          type="radio"
          name="options"
          defaultValue={this.props.activeStreams}
        >
          {this.props.racers.map((btn, index) => (
            <ToggleButton
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
      </React.Fragment>
    );
  }
}

export default SwapBtns;
