require('dotenv').config({ silent: true });

const Hapi = require('hapi');
const Joi = require('joi');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 4000 });

server.register(Inert, (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'POST',
    path: '/tweets',
    handler: require('./handlers/tweets'),
    config: {
      validate: {
        payload: {
          categories: Joi.array().items(Joi.string()).required(),
        },
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: require('path').join(__dirname, '..', 'build'),
      },
    },
  });

  server.start(err => {
    if (err) {
      throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
  });
});
