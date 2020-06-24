import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class SwapBtns extends Component {
  render() {
    return (
      /*

      TURN THIS INTO A MAPPING


      */

      <Container>
        <Button
          className="btn btn-remove mx-1 my-1"
          onClick={() =>
            this.changeRacer(this.props.racers[0], this.props.streamNum)
          }
        >
          {this.props.racers[0]}
        </Button>

        <Button
          className="btn btn-remove mx-1 my-1"
          onClick={() =>
            this.changeRacer(this.props.racers[1], this.props.streamNum)
          }
        >
          {this.props.racers[1]}
        </Button>

        <Button
          className="btn btn-remove mx-1 my-1"
          onClick={() =>
            this.changeRacer(this.props.racers[2], this.props.streamNum)
          }
        >
          {this.props.racers[2]}
        </Button>

        <Button
          className="btn btn-remove mx-1 my-1"
          onClick={() =>
            this.changeRacer(this.props.racers[3], this.props.streamNum)
          }
        >
          {this.props.racers[3]}
        </Button>
        <br />
      </Container>
    );
  }
  changeRacer(racer, streamNum) {
    this.props.changeRacer(racer, this.props.streamNum);
  }
}

export default SwapBtns;
