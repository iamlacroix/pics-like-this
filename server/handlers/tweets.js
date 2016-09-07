const uniqBy = require('lodash.uniqby');
const twitter = require('../lib/twitter');

module.exports = (request, reply) => {
  const { categories } = request.payload;

  if (categories.length === 0) {
    return reply({ length: 0, images: [] });
  }

  const searchOpts = {
    q: `${categories.join(' OR ')} filter:images`,
    count: 100,
    lang: 'en',
  }

  twitter.get('search/tweets', searchOpts)
    .then(result => {
      const { statuses } = result.data;

      const images = statuses
        .map(({ id, entities: { media } }) => ({
          id,
          url: media && media[0] && media[0].media_url,
        }))
        .filter(image => image.url);

      reply({ length: statuses.length, images: uniqBy(images, 'id').slice(0, 48) });
    })
    .catch(err => reply({ err }));
};
