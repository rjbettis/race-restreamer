import React, { Component } from 'react';
import { Container, Navbar, Button, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    this.setState({ googleLoggedIn: this.props.location.state.googleLoggedIn });
    this.setState({
      GoogleLoginResponse: this.props.location.state.GoogleLoginResponse,
    });
    this.setState({ authenticated: true });
  }

  googleLogout = (response) => {
    this.setState({
      GoogleLoginResponse: null,
      googleLoggedIn: false,
      authenticated: false,
    });
  };

  googleLogin = (response) => {
    this.setState({ GoogleLoginResponse: response, googleLoggedIn: true });
  };

  googleLoginFailure = (response) => {
    this.setState({ GoogleLoginResponse: response });
  };

  render() {
    return this.state.authenticated ? (
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
          {/*
           * Populate Demo Button
           */}
          <Button
            type="submit"
            variant="secondary"
            onClick={() => this.demo(this.state.demoChannels)}
          >
            Populate Demo Layout
          </Button>

          {/*
           * Modal for colors
           */}

          <Button
            type="submit"
            variant="secondary"
            onClick={(event) => this.handleModalShow(event)}
          >
            Customize Layout Colors
          </Button>

          <Nav className="ml-auto">
            {this.state.googleLoggedIn ? (
              <Container>
                <img
                  className="nav-img"
                  src={this.state.GoogleLoginResponse.profileObj.imageUrl}
                  height="40"
                  width="40"
                  alt="img"
                />
                <NavDropdown
                  title={this.state.GoogleLoginResponse.profileObj.email}
                  variant="secondary"
                  onClick=""
                >
                  <NavDropdown.Item>
                    <Link
                      to={{
                        pathname: 'Profile',
                        state: {
                          googleLoggedIn: this.state.googleLoggedIn,
                          GoogleLoginResponse: this.state.GoogleLoginResponse,
                        },
                      }}
                    >
                      Profile
                    </Link>
                  </NavDropdown.Item>

                  <GoogleLogout
                    clientId="1097939992919-lftp3shqik60gl553d4m4rdm9efijttm.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <NavDropdown.Item
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        Logout
                      </NavDropdown.Item>
                    )}
                    buttonText="Logout"
                    onLogoutSuccess={this.googleLogout}
                  ></GoogleLogout>
                </NavDropdown>
              </Container>
            ) : (
              <GoogleLogin
                clientId="1097939992919-lftp3shqik60gl553d4m4rdm9efijttm.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.googleLogin}
                onFailure={this.googleLoginFailure}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
                redirectUri="https://www.google.com/"
              />
            )}
          </Nav>
        </Navbar>
        <Container>Profile Page</Container>
      </Container>
    ) : null;
  }
}

export default Profile;
