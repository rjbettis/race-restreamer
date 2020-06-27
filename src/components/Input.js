import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      submittedChannel: '',
      channelList: [],
      userNotFound: '',
      channelUrl: '',
    };
  }

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ submittedChannel: this.state.searchValue });
    this.makeApiCall(this.state.searchValue);
  };

  async makeApiCall(searchValue) {
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/verify-channel?channel=${searchValue}`
    );

    const res = await response.json();

    this.setState({ channelResponse: res });

    if (res._total === 1) {
      this.setState({ validChannel: true });

      let list = [...this.state.channelList];
      list.push(this.state.submittedChannel);
      this.setState({ channelList: list });
    } else {
      this.setState({ validChannel: false });
      this.setState({
        userNotFound:
          this.state.submittedChannel + ' not found. Please try again.',
      });
    }

    this.setState({ searchValue: '' });
  }

  render() {
    return (
      <Container>
        <Form id="inputForm" onSubmit={this.handleSearch}>
          <Form.Label className="formLabel">
            Enter the name of a twitch channel to add to the restream list.
            Channel is not required to be live at the moment to be added.
          </Form.Label>
          <Form.Control
            className="formMargin"
            placeholder="Enter channel name (minimum of 4)"
            value={this.state.searchValue}
            onChange={(event) => this.handleOnChange(event)}
          />
          {this.state.validChannel ? (
            <Form.Label className="green greenSuccessText">
              {this.state.submittedChannel} is added to the list
            </Form.Label>
          ) : (
            <Form.Label className="red">{this.state.userNotFound}</Form.Label>
          )}
        </Form>

        {this.state.channelList.map((channel, index) => (
          <React.Fragment>
            <label key="index">{channel}</label>
            <br />
          </React.Fragment>
        ))}

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
