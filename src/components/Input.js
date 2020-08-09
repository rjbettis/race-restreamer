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
      demoChannels: [],
      channelNames: [],
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/demo-channels?category=retro`
    );

    const res = await response.json();
    this.setState({ demoChannels: res });
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

    this.setState({ separatedArray: separatedArray });

    //makes API call on every channel in the separatedArray
    this.makeApiCall(separatedArray);
  };

  /*
   * Makes API calls and builds valid and invalid channel lists.
   */
  async makeApiCall(separatedArray) {
    const sepArray = separatedArray.map(async (channel) => {
      const response = await fetch(
        `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/verify-channel?channel=${channel}`
      );
      return response.json();
    });

    const res = await Promise.all(sepArray);

    console.log(res);

    res.forEach((resp, index) => {
      if (resp._total > 0) {
        let validChannels = [...this.state.validChannels];
        validChannels.push(resp.users[0].display_name);
        this.setState({ validChannels: validChannels });
      } else {
        let invalidChannels = [...this.state.invalidChannels];
        invalidChannels.push(separatedArray[index]);
        this.setState({ invalidChannels: invalidChannels });
      }
    });

    //clears search bar
    this.setState({ searchValue: '' });
  }

  demo(demoChannels) {
    let test = demoChannels.streams;
    let channelNames = [...this.state.channelNames];

    test.forEach((channel) => {
      channelNames.push(channel.channel.display_name);
    });

    this.setState({ validChannels: channelNames });
  }

  render() {
    return (
      <Container fluid={true} className="zeroPaddingMarigin">
        <Navbar className="color-nav" variant="dark">
          <img
            className="nav-img"
            src="https://race-restream.s3.amazonaws.com/RR.png"
            height="40"
            width="40"
            alt="img"
          />
          <Navbar.Brand className="large-nav" href="/">
            Build New List
          </Navbar.Brand>
        </Navbar>

        <Container>
          <Row>
            <Button
              className="buildStreamBtn"
              type="submit"
              variant="secondary"
              onClick={() => this.demo(this.state.demoChannels)}
            >
              Populate Demo Layout
            </Button>
          </Row>
          <label className="formLabel">
            Enter channel names individually or as a comma separated list.
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
                <Container key={index}>
                  <label className="green">
                    {channel + ' '}is added to the list.
                  </label>
                  <br />
                </Container>
              ))}
            </Col>
            <Col>
              <h5 className="formMargin">Invalid Channels</h5>
              {this.state.invalidChannels.map((channel, index) => (
                <Container key={index}>
                  <label className="red" key={index}>
                    {channel + ' '}not found. Please try again.
                  </label>
                  <br />
                </Container>
              ))}
            </Col>
          </Row>

          {this.state.validChannels.length > 4 ? (
            <Container fluid={true}>
              <Row>
                <Col>
                  <Link
                    to={{
                      pathname: `/Layout4`,
                      search: `?streams=${this.state.validChannels}`,
                    }}
                  >
                    <Button variant="secondary" className="buildStreamBtn">
                      Build Restream Layout
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          ) : null}

          {this.state.validChannels.length === 4 ? (
            <React.Fragment>
              <Row>
                <Col>
                  <Link
                    to={{
                      pathname: `/Layout4`,
                      search: `?streams=${this.state.validChannels}`,
                    }}
                  >
                    <Button variant="secondary" className="buildStreamBtn">
                      Build Restream Layout With Buttons
                    </Button>
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link
                    to={{
                      pathname: `/Layout4NoButtons`,
                      search: `?streams=${this.state.validChannels}`,
                    }}
                  >
                    <Button variant="secondary" className="buildStreamBtn">
                      Build Restream Layout Without Buttons
                    </Button>
                  </Link>
                </Col>
              </Row>
            </React.Fragment>
          ) : null}
          {this.state.validChannels.length === 3 ? (
            <Link
              to={{
                pathname: '/Layout3',
                search: `?streams=${this.state.validChannels}`,
              }}
            >
              <Button variant="secondary" className="buildStreamBtn">
                Build Restream Layout
              </Button>
            </Link>
          ) : null}
          {this.state.validChannels.length === 2 ? (
            <Link
              to={{
                pathname: '/Layout2',
                search: `?streams=${this.state.validChannels}`,
              }}
            >
              <Button variant="secondary" className="buildStreamBtn">
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
