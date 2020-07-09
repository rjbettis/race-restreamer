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
2. RaceLayoutFour
   - Reads the channel array and renders a layout for a 4+ person race.
3. RaceLayoutThree
   - Reads the channel array and renders a layout for a 3 person race.
4. RaceLayoutTwo
   - Reads the channel array and renders a layout for a 2 person race.
5. SwapButtons
   - Reads the channel array and renders toggle buttons to swap between channels.

## Todo

### Home Page

- [ ] Make home page to concisely describe application function

### Main Functionality

- [x] Make simple layouts that do not require an account
- [ ] User accounts (login through twitch API)
- [ ] Make component to build and customize a layout
- [ ] Make advanced layout component
- [ ] Layout saving
- [ ] Demo

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
- [ ] Add profile images and design a better looking lists
- [ ] Check for duplicate channel and prevent insert

### Race Layouts

- [x] Make 2 channel race layout
- [x] Make 3 channel race layout
- [x] Make 4 channel race layout
- [x] Write logic for swapping channels
- [x] Render player size dynamically based on window height
- [x] Minimize states and code for 4 channel race layout
- [x] Increase modularity
- [x] Design clean, minimal styling for easy OBS captures
- [ ] Allow swapping 4 channels being currently displayed
- [ ] Improve math formula to determine player size based on window height
- [ ] Resize and create button columns based on racer array length
- [ ] Fix 2 and 3 race layout

### Player

- [x] Make player component to handle embedded options and player object initialization
- [x] Add buttons to swap channels
- [x] Update player container on channel swap
- [x] Move buttons to new component to increase modularity

### Advanced Input

- [ ] Determine advanced layout functionality before making this todo list

### Misc

- [ ] Write a better Project Description
