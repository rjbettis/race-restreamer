import React, { Component } from 'react';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Image,
  Modal,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { SketchPicker } from 'react-color';

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
    };
  }

  async componentDidMount() {
    document.body.className = '';
    const response = await fetch(
      `https://dh470k8a55.execute-api.us-east-1.amazonaws.com/dev/demo-channels?category=retro`
    );

    const res = await response.json();
    this.setState({ demoChannels: res });
    this.setState({ showColorPicker: false });
    this.setState({ showFontColorPicker: false });
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
        var n = this.state.validChannels.includes(resp.users[0].display_name);

        if (n === false) {
          let validChannels = [...this.state.validChannels];
          validChannels.push(resp.users[0].display_name);
          this.setState({ validChannels: validChannels });

          let profileImages = [...this.state.profileImages];
          profileImages.push(resp.users[0].logo);
          this.setState({ profileImages: profileImages });
        }
        if (n === true) {
          this.setState({
            existingChannel:
              resp.users[0].display_name + ' has already been added.',
          });
        }
      } else {
        this.setState({
          existingChannel: this.state.searchValue + ' does not exist.',
        });
      }
    });

    //clears search bar
    this.setState({ searchValue: '' });
  }

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

  //BACKGROUND
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

  // FONT
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

  //modal control
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

  render() {
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
        </Navbar>

        {/*
         * Container for everything
         */}
        <Container>
          <Row></Row>

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
                        pathname: `/Layout4`,
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
                   * Background color button
                   */}
                  <Row>
                    <Button
                      variant="secondary"
                      className="buildStreamBtn"
                      onClick={(event) =>
                        this.handleBackgroundColorPickerClick(event)
                      }
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
                  </Row>

                  {/*
                   * Font color button
                   */}
                  <Row>
                    <Button
                      variant="secondary"
                      className="buildStreamBtn"
                      onClick={(event) =>
                        this.handleFontColorPickerClick(event)
                      }
                    >
                      Change Font Color
                    </Button>
                    {this.state.showFontColorPicker ? (
                      <Container style={popover}>
                        <Container
                          style={cover}
                          onClick={(event) =>
                            this.handleFontColorPickerClose(event)
                          }
                        />
                        <SketchPicker
                          color={this.state.fontColor}
                          onChange={this.handleFontChange}
                          onChangeComplete={this.handleFontChangeComplete}
                        />
                      </Container>
                    ) : null}
                  </Row>

                  {/*
                   * Build restream layout buttons
                   */}
                  <Row>
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
                  </Row>
                  <Row>
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
                  </Row>
                </React.Fragment>
              ) : null}

              {/*
               * Conditionally renders when user inputs exactly 3 channels
               */}
              {this.state.validChannels.length === 3 ? (
                <React.Fragment>
                  {/*
                   * Background color button
                   */}
                  <Row>
                    <Button
                      variant="secondary"
                      className="buildStreamBtn"
                      onClick={(event) =>
                        this.handleBackgroundColorPickerClick(event)
                      }
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
                  </Row>

                  {/*
                   * Font color button
                   */}
                  <Row>
                    <Button
                      variant="secondary"
                      className="buildStreamBtn"
                      onClick={(event) =>
                        this.handleFontColorPickerClick(event)
                      }
                    >
                      Change Font Color
                    </Button>
                    {this.state.showFontColorPicker ? (
                      <Container style={popover}>
                        <Container
                          style={cover}
                          onClick={(event) =>
                            this.handleFontColorPickerClose(event)
                          }
                        />
                        <SketchPicker
                          color={this.state.fontColor}
                          onChange={this.handleFontChange}
                          onChangeComplete={this.handleFontChangeComplete}
                        />
                      </Container>
                    ) : null}
                  </Row>

                  {/*
                   * Build restream layout buttons
                   */}
                  <Row>
                    <Link
                      to={{
                        pathname: `/Layout3`,
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
                        pathname: `/Layout3NoButtons`,
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
                   * Background color button
                   */}
                  <Row>
                    <Button
                      variant="secondary"
                      className="buildStreamBtn"
                      onClick={(event) =>
                        this.handleBackgroundColorPickerClick(event)
                      }
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
                  </Row>

                  {/*
                   * Font color button
                   */}
                  <Row>
                    <Button
                      variant="secondary"
                      className="buildStreamBtn"
                      onClick={(event) =>
                        this.handleFontColorPickerClick(event)
                      }
                    >
                      Change Font Color
                    </Button>
                    {this.state.showFontColorPicker ? (
                      <Container style={popover}>
                        <Container
                          style={cover}
                          onClick={(event) =>
                            this.handleFontColorPickerClose(event)
                          }
                        />
                        <SketchPicker
                          color={this.state.fontColor}
                          onChange={this.handleFontChange}
                          onChangeComplete={this.handleFontChangeComplete}
                        />
                      </Container>
                    ) : null}
                  </Row>

                  {/*
                   * Build restream layout buttons
                   */}
                  <Row>
                    <Link
                      to={{
                        pathname: `/Layout2`,
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
                        pathname: `/Layout2NoButtons`,
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
        <Modal
          show={this.state.showModal}
          onHide={(event) => this.handleClose(event)}
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
