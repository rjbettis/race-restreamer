[Easily restream speedrun and blind races on twitch.](https://racerestream.com)

## Project Description

This web application provides a clean layout to capture 4 embedded twitch players in order to restream speedrun and blind races. The typical way to do this is for every racer to stream directly to an RTMP server for the restream channel to capture for live commentary. If an RTMP server is not available the next option is for all the racers to stream to their own channel, open up numerous twitch windows and capture them individually in OBS, while also using OBS to swap between racers during the race.

Race Restream simplifies the process by allowing the restreamer to capture a single browser source and never having to touch OBS to swap around channels.

## Technologies Utilized

React web application with a bootstrap frontend and AWS backend.

1. Create React App
2. React Bootstrap front-end framework
3. React Router
4. AWS API Gateway
5. Lambda
6. AWS S3
7. AWS CloudFront
8. AWS Route 53
9. Twitch API

## Pages

1. Home
   - Input channel names individually or by a comma separated list.
2. Layout
   - Will render a 2, 3 or 4 player layout and a group of buttons to swap around channels.

## Components

1. Input
   - Provides a form for channel input. When submitted the app makes an API call to the backend to run a lambda function to verify the channel exists and checks the response. Channels are added to an array and passed to child components.
2. FourStreamLayout
   - Reads the channel array and renders a layout for a 4+ person race with buttons to swap channels.
3. ThreeStreamLayout
   - Reads the channel array and renders a layout for a 3 person race with buttons to swap channels.
4. TwoStreamLayout
   - Reads the channel array and renders a layout for a 2 person race with buttons to swap channels.
5. FourStreamLayoutNoBtn
   - Reads the channel array and renders a static layout for a 4 person race.
6. ThreeStreamLayoutNoBtn
   - Reads the channel array and renders a static layout for a 3 person race.
7. TwoStreamLayoutNoBtn
   - Reads the channel array and renders a static layout for a 2 person race.
8. Player
   - Reads the channel array and builds a twitch player with channel buttons.
9. SwapButtons
   - Reads the channel array and builds toggle buttons to bring new channels in and out of the layout.
10. PlayerNoButtons
    - Reads the channel array and builds a twitch player without channel buttons.
11. PlayerNoButtonsWidthDependent
    - Reads the channel array and builds a twitch player without channel buttons. Designed to specifically work with the 2 channel layout.

## Todo

### Home Page

- [ ] Make home page to concisely describe application function

### Main Functionality

- [x] Make simple layouts that do not require an account
- [x] Demo
- [ ] User accounts (login through twitch API)
- [ ] Make component to build and customize a layout
- [ ] Make advanced layout component
- [ ] Layout saving

### Simple Input

- [x] Make input UI
- [x] Update Serverless yml file to initialize API Gateway and Lambda function
- [x] Write Lambda function to check if channel exists
- [x] Write API call function
- [x] Display validation results
- [x] Parse comma separated channel list and split into array
- [x] Update API call function to handle array of channels
- [x] Basic Styling
- [x] Use react router to initialize channel list from query string
- [x] Make list in order of input
- [x] Add option for no buttons for 2 and 3 layouts
- [x] Check for duplicate channel and prevent insert
- [x] Fig bug where labels dont show up when clicking back on the browser from a no-button layout
- [x] Add option to alphabetize or use input order
- [x] Add profile images
- [x] Add color configuration in a modal that is accesible in the navigation bar
- [x] Update body color in componentDidMount
- [x] Fix color modal close method
- [x] Improve component names

### Race Layouts

- [x] Make 2 channel race layout
- [x] Make 3 channel race layout
- [x] Make 4 channel race layout
- [x] Write logic for swapping channels
- [x] Render player size dynamically based on window height
- [x] Minimize states and code for 4 channel race layout
- [x] Increase modularity
- [x] Design clean, minimal styling for easy OBS captures
- [x] Create 1 or 2 columns of buttons based on channel array length
- [x] Fix 2 and 3 race layout
- [x] Added 4 channel layout without buttons
- [x] Fix whitespace on bottom of 4 channel layout
- [x] Fix firefox width issue
- [x] Create 'no button' layout for 2 and 3 channel layouts
- [x] Fix bug when user clicks back on browser, builds new list, and gree/red channel names do not show
- [x] Add ability to change text and background colors
- [ ] Add query string to url for text and background colors
- [ ] Swap current channel positions on button click
- [ ] Improve math formula to determine player size based on window height
- [ ] Sass conditionals for dynamic button size rendering for different resolutions/scales

### Player

- [x] Make player component to handle embedded options and player object initialization
- [x] Add buttons to swap channels
- [x] Update player container on channel swap
- [x] Move buttons to new component to increase modularity

### Advanced Input

- [ ] Determine advanced layout functionality before making this todo list

### Misc

- [ ] Write a better Project Description
