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
      existingChannel: '',
      demoChannels: [],
      channelNames: [],
      profileImages: [],
      demoImages: [],
      background: '#fff',
      fontColor: '#000',
      showModal: false,
      btnToggle: false,
      channelNum: 0,
      layoutPathname: '',
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

          //sets number of channels to a state for layout pathname
          this.setState({ channelNum: this.state.channelNum + 1 });
          if (this.state.channelNum === 2) {
            this.setState({ layoutPathname: 'Two' });
          } else if (this.state.channelNum === 3) {
            this.setState({ layoutPathname: 'Three' });
          } else if (this.state.channelNum === 4) {
            this.setState({ layoutPathname: 'Four' });
          }

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

  /*
   * Handle button checkbox toggle
   */

  handleBtnCheckboxToggle(event) {
    if (this.state.btnToggle === false) {
      this.setState({ btnToggle: true });
    } else if (this.state.btnToggle === true) {
      this.setState({ btnToggle: false });
    }
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
              {this.state.channelNum === 4 ||
              this.state.channelNum === 3 ||
              this.state.channelNum === 2 ? (
                <Form>
                  <Form.Check
                    type="checkbox"
                    label="Add buttons to swap streams?"
                    id="btn"
                    name="btnCheckbox"
                    onClick={(event) => this.handleBtnCheckboxToggle(event)}
                  ></Form.Check>

                  {
                    /*
                     * Links to component without buttons when checkbox is selected
                     * Links to component with buttons when checkbox is not selected
                     */

                    <Link
                      to={{
                        pathname: `/${this.state.layoutPathname}StreamLayout`,
                        search: `?streams=${this.state.validChannels}`,
                        btn: this.state.btnToggle,
                      }}
                    >
                      <Button variant="secondary" className="buildStreamBtn">
                        Generate Restreamer
                      </Button>
                    </Link>
                  }
                </Form>
              ) : null}

              {this.state.validChannels.length > 4 ? (
                <Form>
                  <Form.Check
                    type="checkbox"
                    label="Add buttons to swap streams?"
                    id="btn"
                    name="btnCheckbox"
                    onClick={(event) => this.handleBtnCheckboxToggle(event)}
                  ></Form.Check>
                  {
                    /*
                     * Links to component without buttons when checkbox is selected
                     * Links to component with buttons when checkbox is not selected
                     */

                    <Link
                      to={{
                        pathname: `/FourStreamLayout`,
                        search: `?streams=${this.state.validChannels}`,
                        btn: this.state.btnToggle,
                      }}
                    >
                      <Button variant="secondary" className="buildStreamBtn">
                        Generate Restreamer
                      </Button>
                    </Link>
                  }
                </Form>
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
