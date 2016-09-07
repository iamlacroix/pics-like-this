# Purpose

This app will ask for your location and proceed to display a map of nearby establishments via the Google Places API.

Clicking on a map pin will query the Twitter API for any tweets that include one of the categories the place has been filed under. It will only query for tweets with images, and will display the results in a grid on the page.

# Requirements

- Node.js 6+
- **Optional**: Flow v0.32+ for type-checking during development.

# Getting Started

1. Clone this project and run `npm install` to install the dependencies.
2. The following environment keys are required. You can either set them via the command line, or create a `.env` file in the root of the project and place them in there. The API keys will be explained later.
  - GOOGLE_API_KEY
  - TWITTER_KEY
  - TWITTER_SECRET
3. Use the command `npm run dev` to start both the client and server.

# API Keys

## Google

Visit the [Google API Console](https://console.developers.google.com) and create a new application if necessary. Enable the following API's for your project:

  - Google Places API Web Service
  - Google Maps JavaScript API

## Twitter

Visit [Twitter Apps](https://apps.twitter.com/) and generate a new app if needed. From the app's page, choose *Keys and Access Tokens* from the nav. The *Consumer Key* is the `TWITTER_KEY` and the *Consumer Secret* is the `TWITTER_SECRET` variable.

# Testing

Use `npm test` to run the tests.

# Author

Michael LaCroix
