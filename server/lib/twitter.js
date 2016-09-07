const Twit = require('twit')

const twitter = new Twit({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  app_only_auth: true,
});

module.exports = twitter;
