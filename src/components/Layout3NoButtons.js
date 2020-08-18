import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PlayerNoButtons from './PlayerNoButtons';

class Layout3NoButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamOne: this.parseQueryString()[0],
      streamTwo: this.parseQueryString()[1],
      streamThree: this.parseQueryString()[2],
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    document.body.className = 'body-no-button-layout';
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

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
            <PlayerNoButtons
              streamName={this.state.streamOne}
              windowWidth={this.state.width}
              windowHeight={this.state.height}
            />
          </Col>
          <Col className="no-padding">
            <PlayerNoButtons
              streamName={this.state.streamTwo}
              activeStreams={this.state.activeStreams}
              windowHeight={this.state.height}
            />
          </Col>
        </Row>
        <Row xl={2} className="justify-content-md-center">
          <Col className="no-padding">
            <PlayerNoButtons
              streamName={this.state.streamThree}
              activeStreams={this.state.activeStreams}
              windowHeight={this.state.height}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Layout3NoButtons;
