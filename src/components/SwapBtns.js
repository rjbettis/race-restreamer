import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class SwapBtns extends Component {
  render() {
    const { id } = this.props;
    return (
      <Container>
        <Button
          className="btn btn-remove"
          id={id}
          onClick={() => this.racerOne(id)}
        >
          Racer 1
        </Button>

        <Button
          className="btn btn-remove"
          id={id}
          onClick={() => this.racerTwo(id)}
        >
          Racer 2
        </Button>

        <Button
          className="btn btn-remove"
          id={id}
          onClick={() => this.racerThree(id)}
        >
          Racer 3
        </Button>

        <Button
          className="btn btn-remove"
          id={id}
          onClick={() => this.racerFour(id)}
        >
          Racer 4
        </Button>
        <br />
      </Container>
    );
  }
  racerOne(streamOne) {
    this.props.racerOne(streamOne);
  }
  racerTwo(streamOne) {
    this.props.racerTwo(streamOne);
  }
  racerThree(streamOne) {
    this.props.racerThree(streamOne);
  }
  racerFour(streamOne) {
    this.props.racerFour(streamOne);
  }
}

export default SwapBtns;
