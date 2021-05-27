import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton, Row, Col } from 'react-bootstrap';

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
    return this.props.racers.length < 21 ? (
      <ToggleButtonGroup
        key={this.state.activeStreams}
        vertical
        className="btn padding-top"
        type="radio"
        name="options"
        defaultValue={this.props.activeStreams}
      >
        {this.props.racers.map((btn, index) => (
          <ToggleButton
            className="button left-right-padding"
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
    ) : (
      <Row>
        <Col>
          {/*
           * left button group
           */}
          <ToggleButtonGroup
            key={this.state.activeStreams}
            vertical
            className="btn padding-top"
            type="radio"
            name="options"
            defaultValue={this.props.activeStreams}
          >
            {this.props.racers.map((btn, index) =>
              index < 20 ? (
                <ToggleButton
                  className="button left-padding"
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
                  {this.props.racers[index].slice(0, 9) + '...'}
                </ToggleButton>
              ) : null
            )}
          </ToggleButtonGroup>
        </Col>
        <Col>
          {/*
           * right button group
           */}
          <ToggleButtonGroup
            key={this.state.activeStreams}
            vertical
            className="btn padding-top"
            type="radio"
            name="options"
            defaultValue={this.props.activeStreams}
          >
            {this.props.racers.map((btn, index) =>
              index > 19 ? (
                <ToggleButton
                  className="button left-padding"
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
                  {this.props.racers[index].slice(0, 9) + '...'}
                </ToggleButton>
              ) : null
            )}
          </ToggleButtonGroup>
        </Col>
      </Row>
    );
  }
}

export default SwapButtons;
