import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class SwapButtons extends Component {
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
    this.props.changeRacer(racer, streamNum, racerIndex);
  }

  render() {
    return (
      <ToggleButtonGroup
        key={this.state.activeStreams}
        vertical
        className="btn btn-block no-padding"
        type="radio"
        name="options"
        defaultValue={this.props.activeStreams}
      >
        {this.props.racers.map((btn, index) => (
          <ToggleButton
            className="button no-padding"
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
    );
  }
}

export default SwapButtons;
