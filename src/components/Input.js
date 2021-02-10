import React, { Component } from 'react';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Image,
  Modal,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { SketchPicker } from 'react-color';

import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      validChannels: [],
      invalidChannels: [],
      existingChannel: '',
      existingChannels: [],
      demoChannels: [],
      channelNames: [],
      sortCheckbox: false,
      profileImages: [],
      demoImages: [],
      logoName: [],
      background: '#fff',
      fontColor: '#000',
      showModal: false,
      test: 'test',
    };
  }

  async componentDidMount() {
    document.body.className = '';

    //Fetches channels for the demo layout
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/demo-channels?category=retro`
    );

    const res = await response.json();
    this.setState({ demoChannels: res });
    this.setState({ showColorPicker: false });
    this.setState({ showFontColorPicker: false });

    if (this.props.location.userData) {
      this.setState({ twitchUserData: this.props.location.userData });
      this.setState({ twitchLoggedIn: true });
    }

    document.body.style.backgroundColor = '#f7f7f9';
  }

  /*
   * Updates searchValue state when typing in the input text box
   */

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  /*
   * Adds inputed channels to an array and makes an API call with the array as a parameter.
   */
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
   * Makes API calls and builds a valid channel lists.
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

    //loops on every entity in the response
    res.forEach((resp, index) => {
      if (resp._total > 0) {
        //determines if the display_name in the API call matches a name in the validChannels array
        var n = this.state.validChannels.includes(resp.users[0].display_name);

        if (n === false) {
          //add display_name to valid channels
          let validChannels = [...this.state.validChannels];
          validChannels.push(resp.users[0].display_name);
          this.setState({ validChannels: validChannels });

          let profileImages = [...this.state.profileImages];
          profileImages.push(resp.users[0].logo);
          this.setState({ profileImages: profileImages });
        }

        if (n === true) {
          //render prompt to user that the channel exists in the validChannels array
          this.setState({
            existingChannel:
              resp.users[0].display_name + ' has already been added.',
          });
        }
      } else {
        //render prompt to user that the channel does not exist
        this.setState({
          existingChannel: this.state.searchValue + ' does not exist.',
        });
      }
    });

    //clears search bar
    this.setState({ searchValue: '' });
  }

  /*
   * Adds demoChannels to validChannels list.
   */
  demo(demoChannels) {
    let test = demoChannels.streams;
    let channelNames = [...this.state.channelNames];
    let demoImages = [...this.state.demoImages];

    test.forEach((channel) => {
      channelNames.push(channel.channel.display_name);
    });
    test.forEach((channel) => {
      demoImages.push(channel.channel.logo);
    });

    this.setState({ validChannels: channelNames });
    this.setState({ profileImages: demoImages });
  }

  /*

  alphabetical sort for validChannels. does not sort logo array

  handleSortToggle(event) {
    if (this.state.sortCheckbox === false) {
      this.setState({ sortCheckbox: true });
      this.state.validChannels.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
    } else if (this.state.sortCheckbox === true) {
      this.setState({ sortCheckbox: false });
    }
  }
*/

  /*
   * handles background color selection
   */
  handleBackgroundChange = (color) => {
    this.setState({ background: color.hex });
  };

  handleBackgroundChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  handleBackgroundColorPickerClick() {
    this.setState({ showColorPicker: true });
  }

  handleBackgroundColorPickerClose() {
    this.setState({ showColorPicker: false });
  }

  /*
   * handles font selection
   */
  handleFontChange = (color) => {
    this.setState({ fontColor: color.hex });
  };

  handleFontChangeComplete = (color) => {
    this.setState({ fontColor: color.hex });
  };

  handleFontColorPickerClick() {
    this.setState({ showFontColorPicker: true });
  }

  handleFontColorPickerClose() {
    this.setState({ showFontColorPicker: false });
  }

  /*
   * Background/Font Modal control
   */
  handleModalShow(event) {
    this.setState({
      showModal: true,
    });
  }

  handleModalClose(event) {
    this.setState({
      showModal: false,
    });
  }

  googleLogin = (response) => {
    this.setState({ GoogleLoginResponse: response, googleLoggedIn: true });
  };

  googleLoginFailure = (response) => {
    this.setState({ GoogleLoginResponse: response });
  };

  googleLogout = (response) => {
    this.setState({ GoogleLoginResponse: null, googleLoggedIn: false });
  };

  refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log('newAuthRes:', newAuthRes);
      // saveUserToken(newAuthRes.access_token);  <-- save new token
      localStorage.setItem('authToken', newAuthRes.id_token);

      // Setup the other timer after the first one
      setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
  };

  twitchLogin(event) {
    this.setState({ twitchLoggedIn: true });
  }

  handleTwitchLogout(event) {
    console.log('logout');
    this.setState({ twitchLoggedIn: false });
    this.setState({ twitchUserData: null });
  }

  render() {
    //Modal properties
    const popover = {
      position: 'absolute',
      zIndex: '2',
    };

    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    };

    return (
      <Container fluid={true} className="zeroPaddingMarigin">
        {/*
         * Navigation bar
         */}
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

        {/*
         * Container for everything
         */}
        <Container>
          {/*
           * Channel input form
           */}
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

          {/*
           * Label displays failed channel input
           */}
          <Container key={this.state.existingChannel}>
            <label className="red" key={this.state.existingChannel}>
              {this.state.existingChannel}
            </label>
            <br />
          </Container>

          {/*
           * Left hand column with labels to display succesfull channel input
           */}
          <Row>
            <Col>
              <h5 className="formMargin">Valid Channels</h5>
              {this.state.validChannels.map((channel, index) => (
                <Container key={index}>
                  <Image
                    className="profileImg"
                    src={this.state.profileImages[index]}
                    rounded
                  />
                  <label className="green">
                    {channel + ' '}is added to the list.
                  </label>
                  <br />
                </Container>
              ))}
            </Col>

            {/*
             * Right hand column with buttons to build the layout
             */}
            <Col>
              {/*
               * Conditionally renders when user inputs more than 4 channels
               */}
              {this.state.validChannels.length > 4 ? (
                <Container fluid={true}>
                  {/*
                   * Build restream layout button
                   */}
                  <Row>
                    <Link
                      to={{
                        pathname: `/FourStreamLayout`,
                        search: `?streams=${this.state.validChannels}`,
                        background: this.state.background,
                        fontColor: this.state.fontColor,
                      }}
                    >
                      <Button variant="secondary" className="buildStreamBtn">
                        Build Restream Layout
                      </Button>
                    </Link>
                  </Row>
                </Container>
              ) : null}

              {/*
               * Conditionally renders when user inputs exactly 4 channels
               */}
              {this.state.validChannels.length === 4 ? (
                <React.Fragment>
                  {/*
                   * Build restream layout buttons
                   */}
                  <Row>
                    <Link
                      to={{
                        pathname: `/FourStreamLayout`,
                        search: `?streams=${this.state.validChannels}`,
                      }}
                    >
                      <Button variant="secondary" className="buildStreamBtn">
                        Build Restream Layout With Buttons
                      </Button>
                    </Link>
                  </Row>
                  <Row>
                    <Link
                      to={{
                        pathname: `/FourStreamLayoutNoBtn`,
                        search: `?streams=${this.state.validChannels}`,
                      }}
                    >
                      <Button variant="secondary" className="buildStreamBtn">
                        Build Restream Layout Without Buttons
                      </Button>
                    </Link>
                  </Row>
                </React.Fragment>
              ) : null}

              {/*
               * Conditionally renders when user inputs exactly 3 channels
               */}
              {this.state.validChannels.length === 3 ? (
                <React.Fragment>
                  {/*
                   * Build restream layout buttons
                   */}
                  <Row>
                    <Link
                      to={{
                        pathname: `/ThreeStreamLayout`,
                        search: `?streams=${this.state.validChannels}`,
                      }}
                    >
                      <Button variant="secondary" className="buildStreamBtn">
                        Build Restream Layout With Buttons
                      </Button>
                    </Link>
                  </Row>
                  <Row>
                    <Link
                      to={{
                        pathname: `/ThreeStreamLayoutNoBtn`,
                        search: `?streams=${this.state.validChannels}`,
                      }}
                    >
                      <Button variant="secondary" className="buildStreamBtn">
                        Build Restream Layout Without Buttons
                      </Button>
                    </Link>
                  </Row>
                </React.Fragment>
              ) : null}

              {/*
               * Conditionally renders when user inputs exactly 2 channels
               */}
              {this.state.validChannels.length === 2 ? (
                <React.Fragment>
                  {/*
                   * Build restream layout buttons
                   */}
                  <Row>
                    <Link
                      to={{
                        pathname: `/TwoStreamLayout`,
                        search: `?streams=${this.state.validChannels}`,
                      }}
                    >
                      <Button variant="secondary" className="buildStreamBtn">
                        Build Restream Layout With Buttons
                      </Button>
                    </Link>
                  </Row>
                  <Row>
                    <Link
                      to={{
                        pathname: `/TwoStreamLayoutNoBtn`,
                        search: `?streams=${this.state.validChannels}`,
                      }}
                    >
                      <Button variant="secondary" className="buildStreamBtn">
                        Build Restream Layout Without Buttons
                      </Button>
                    </Link>
                  </Row>
                </React.Fragment>
              ) : null}
            </Col>
          </Row>
        </Container>
        {/*
         * Modal component to select background and font colors
         */}
        <Modal
          show={this.state.showModal}
          onHide={(event) => this.handleModalClose(event)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Customize Background and Font Colors</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*
             * Background color button
             */}

            <Button
              variant="secondary"
              className="buildStreamBtn"
              onClick={(event) => this.handleBackgroundColorPickerClick(event)}
            >
              Change Background Color
            </Button>
            {this.state.showColorPicker ? (
              <Container style={popover}>
                <Container
                  style={cover}
                  onClick={(event) =>
                    this.handleBackgroundColorPickerClose(event)
                  }
                />
                <SketchPicker
                  color={this.state.background}
                  onChange={this.handleBackgroundChange}
                  onChangeComplete={this.handleBackgroundChangeComplete}
                />
              </Container>
            ) : null}

            {/*
             * Font color button
             */}

            <Button
              variant="secondary"
              className="buildStreamBtn"
              onClick={(event) => this.handleFontColorPickerClick(event)}
            >
              Change Font Color
            </Button>
            {this.state.showFontColorPicker ? (
              <Container style={popover}>
                <Container
                  style={cover}
                  onClick={(event) => this.handleFontColorPickerClose(event)}
                />
                <SketchPicker
                  color={this.state.fontColor}
                  onChange={this.handleFontChange}
                  onChangeComplete={this.handleFontChangeComplete}
                />
              </Container>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(event) => this.handleModalClose(event)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default Input;
