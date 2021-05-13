import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PlayerNoButtonsWidthDependent from '../PlayerNoButtonsWidthDependent';

class TwoStreamLayoutNoBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamOne: this.parseQueryString()[0],
      streamTwo: this.parseQueryString()[1],
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    //sets window size
    window.addEventListener('resize', this.updateDimensions);
    document.body.className = 'body-no-button-layout';
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  /*
   * Parse search prop provided by react router
   */
  parseQueryString() {
    let query = this.props.location.search;
    query = query.replace('?streams=', '');
    query = query.split(',');
    return query;
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });

    setTimeout(function () {
      window.location.reload();
    });
  };

  render() {
    return (
      <Container fluid={true} className="no-padding">
        <Row className="no-margin">
          <Col className="no-padding">
            <PlayerNoButtonsWidthDependent
              streamName={this.state.streamOne}
              windowWidth={this.state.width}
              windowHeight={this.state.height}
            />
          </Col>
          <Col className="no-padding">
            <PlayerNoButtonsWidthDependent
              streamName={this.state.streamTwo}
              windowWidth={this.state.width}
              windowHeight={this.state.height}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TwoStreamLayoutNoBtn;
