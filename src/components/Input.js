import React, { Component } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      submittedChannel: '',
      channelList: [],
      validList: [],
      invalidList: [],
      channelUrl: '',
    };
  }

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  convertToArray(searchValue) {
    var array = searchValue.split(',');

    array.map((element, index) => (array[index] = element.trim()));

    return array;
  }

  handleSearch = (e) => {
    e.preventDefault();

    var array = this.state.searchValue.split(',');

    if (array.length > 1) {
      this.setState({
        separatedArray: this.convertToArray(this.state.searchValue),
      });
      this.mapArrayApiCall(this.convertToArray(this.state.searchValue));
    } else {
      this.setState({ submittedChannel: this.state.searchValue });
      this.makeApiCall(this.state.searchValue);
    }
  };

  /*
   * Runs when user inputs a comma separated list
   */
  async makeApiCallOnArray(channel) {
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/verify-channel?channel=${channel}`
    );

    const res = await response.json();

    this.setState({ channelResponse: res });

    if (res._total === 1) {
      let list = [...this.state.channelList];
      list.push(channel);
      this.setState({ channelList: list });

      let validList = [...this.state.validList];
      let caseSensitiveName = this.makeCaseSensiteName(); //gets case sensitive name from api results
      validList.push(caseSensitiveName + ' is added to the list'); //push case sensitive name to validList
      this.setState({ validList: validList });
    } else {
      let invalidList = [...this.state.invalidList];
      invalidList.push(channel + ' not found. Please try again.');
      this.setState({ invalidList: invalidList });
    }
  }

  mapArrayApiCall(separatedArray) {
    separatedArray.forEach((channel) => {
      this.makeApiCallOnArray(channel);
    });
  }

  makeCaseSensiteName() {
    let caseSensitiveName;

    this.state.channelResponse.users.forEach((name) => {
      caseSensitiveName = name.display_name;
    });

    return caseSensitiveName;
  }

  /*
   * Runs when user inputs a single channel
   */
  async makeApiCall(searchValue) {
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/verify-channel?channel=${searchValue}`
    );

    const res = await response.json();

    this.setState({ channelResponse: res });

    if (res._total === 1) {
      //channel list that builds race layout
      let list = [...this.state.channelList];
      list.push(this.state.submittedChannel);
      this.setState({ channelList: list });

      //if username is not valid add status to invalid list
      let validList = [...this.state.validList];
      let caseSensitiveName = this.makeCaseSensiteName(); //gets case sensitive name from api results
      validList.push(caseSensitiveName + ' is added to the list'); //push case sensitive name to validList
      this.setState({ validList: validList });
    } else {
      let invalidList = [...this.state.invalidList];
      invalidList.push(
        this.state.submittedChannel + ' not found. Please try again.'
      );
      this.setState({ invalidList: invalidList });
    }

    this.setState({ searchValue: '' });
  }

  render() {
    return (
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
                placeholder="Enter channel name"
                value={this.state.searchValue}
                onChange={(event) => this.handleOnChange(event)}
              />
            </Col>
            <Col xl="auto">
              <Button type="submit" className="formMargin" variant="secondary">
                Submit
              </Button>
            </Col>
          </Form.Row>
        </Form>

        <Row>
          <Col>
            <h5 className="formMargin">Valid Channels</h5>
            {this.state.validList.map((channel, index) => (
              <Container>
                <label className="green" key={index}>
                  {channel}
                </label>
                <br />
              </Container>
            ))}
          </Col>
          <Col>
            <h5 className="formMargin">Invalid Channels</h5>
            {this.state.invalidList.map((channel, index) => (
              <Container>
                <label className="red" key={index}>
                  {channel}
                </label>
                <br />
              </Container>
            ))}
          </Col>
        </Row>

        {this.state.channelList.length > 3 ? (
          <Link
            to={{
              pathname: '/RaceLayoutFour',
              state: { channelList: this.state.channelList },
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

        {this.state.channelList.length === 3 ? (
          <Link
            to={{
              pathname: '/RaceLayoutThree',
              state: { channelList: this.state.channelList },
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

        {this.state.channelList.length === 2 ? (
          <Link
            to={{
              pathname: '/RaceLayoutTwo',
              state: { channelList: this.state.channelList },
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
    );
  }
}

export default Input;
