import React, { Component } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      validChannels: [],
      invalidChannels: [],
    };
  }

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = (e) => {
    e.preventDefault();

    //trim comma'd input and remove whitespace
    let separatedArray = this.state.searchValue.split(',');
    separatedArray.forEach(
      (element, index) => (separatedArray[index] = element.trim())
    );

    //makes API call on every channel in the separatedArray
    separatedArray.forEach((channel) => {
      this.makeApiCall(channel);
    });
  };

  /*
   * Makes API calls and builds valid and invalid channel lists.
   */
  async makeApiCall(channel) {
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/verify-channel?channel=${channel}`
    );
    const res = await response.json();

    if (res._total > 0) {
      let caseSensitiveName;
      res.users.forEach((name) => {
        caseSensitiveName = name.display_name;
      });

      let validChannels = [...this.state.validChannels];
      validChannels.push(caseSensitiveName);
      this.setState({ validChannels: validChannels });
    } else {
      let invalidChannels = [...this.state.invalidChannels];
      invalidChannels.push(channel);
      this.setState({ invalidChannels: invalidChannels });
    }

    //clears search bar
    this.setState({ searchValue: '' });
  }

  userLink(userId) {
    return `/users/${this.state.validChannels}/`;
  }

  render() {
    return (
      <Container fluid={true} className="zeroPaddingMarigin">
        <Navbar className="color-nav" variant="dark">
          <img
            className="nav-img"
            src="../../rr.ico"
            height="40"
            width="40"
            alt="img"
          />
          <Navbar.Brand className="large-nav" href="/">
            Build New List
          </Navbar.Brand>
        </Navbar>

        <Container>
          <label className="formLabel">
            Enter the name of a twitch channel to add to the restream list.
            Channel is not required to be live at the moment to be added.
          </label>
          <Form id="inputForm" onSubmit={this.handleSearch}>
            <Form.Row>
              <Col xl={11}>
                <Form.Control
                  className="formMargin"
                  value={this.state.searchValue}
                  onChange={(event) => this.handleOnChange(event)}
                />
              </Col>
              <Col xl="auto">
                <Button
                  type="submit"
                  className="formMargin"
                  variant="secondary"
                >
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Form>
          <Row>
            <Col>
              <h5 className="formMargin">Valid Channels</h5>
              {this.state.validChannels.map((channel, index) => (
                <Container>
                  <label className="green" key={index}>
                    {channel + ' '}is added to the list.
                  </label>
                  <br />
                </Container>
              ))}
            </Col>
            <Col>
              <h5 className="formMargin">Invalid Channels</h5>
              {this.state.invalidChannels.map((channel, index) => (
                <Container>
                  <label className="red" key={index}>
                    {channel + ' '}not found. Please try again.
                  </label>
                  <br />
                </Container>
              ))}
            </Col>
          </Row>
          {this.state.validChannels.length > 3 ? (
            <Link
              to={{
                pathname: `/RaceLayoutFour`,
                search: `?streams=${this.state.validChannels}`,
              }}
            >
              <Button
                variant="secondary"
                size="lg"
                block
                className="buildStreamBtn"
              >
                Build Restream Layout
              </Button>
            </Link>
          ) : null}
          {this.state.validChannels.length === 3 ? (
            <Link
              to={{
                pathname: '/RaceLayoutThree',
                state: { validChannels: this.state.validChannels },
              }}
            >
              <Button
                variant="secondary"
                size="lg"
                block
                className="buildStreamBtn"
              >
                Build Restream Layout
              </Button>
            </Link>
          ) : null}
          {this.state.validChannels.length === 2 ? (
            <Link
              to={{
                pathname: '/RaceLayoutTwo',
                state: { validChannels: this.state.validChannels },
              }}
            >
              <Button
                variant="secondary"
                size="lg"
                block
                className="buildStreamBtn"
              >
                Build Restream Layout
              </Button>
            </Link>
          ) : null}
        </Container>
      </Container>
    );
  }
}

export default Input;
