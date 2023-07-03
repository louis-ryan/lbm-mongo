const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  env: {
    MONGO_URI: process.env.MONGO_URI
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'ico'],
  inlineImageLimit: -1,
});
