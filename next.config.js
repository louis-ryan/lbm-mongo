const withImages = require('next-images');

module.exports = withImages({
  env: {
    MONGO_URI: process.env.MONGO_URI
  },
  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'ico'],
  inlineImageLimit: -1,
});
