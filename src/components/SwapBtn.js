import React, { Component } from 'react';

class SwapBtn extends Component {
  render() {
    const { id } = this.props;
    return (
      <React.Fragment>
        <button
          className="btn btn-remove"
          id={id}
          onClick={() => this.racerOne(id)}
        >
          Racer 1
        </button>
        <br />
        <button
          className="btn btn-remove"
          id={id}
          onClick={() => this.racerTwo(id)}
        >
          Racer 2
        </button>
        <br />
        <button
          className="btn btn-remove"
          id={id}
          onClick={() => this.racerThree(id)}
        >
          Racer 3
        </button>
        <br />
        <button
          className="btn btn-remove"
          id={id}
          onClick={() => this.racerFour(id)}
        >
          Racer 4
        </button>
        <br />
      </React.Fragment>
    );
  }
  racerOne(channel) {
    this.props.racerOne(channel);
  }
  racerTwo(channel) {
    this.props.racerTwo(channel);
  }
  racerThree(channel) {
    this.props.racerThree(channel);
  }
  racerFour(channel) {
    this.props.racerFour(channel);
  }
}

export default SwapBtn;
