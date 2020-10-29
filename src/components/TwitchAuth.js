import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class TwitchAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
    };
  }
  async componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const myParam = urlParams.get('code');

    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/twitch-auth?code=${myParam}`
    );

    const res = await response.json();

    this.setState({ userData: res });
  }

  render() {
    return this.state.userData ? (
      <Redirect
        to={{
          pathname: '/',
          userData: this.state.userData,
        }}
      />
    ) : null;
  }
}

export default TwitchAuth;
