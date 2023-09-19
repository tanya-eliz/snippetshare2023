const config = {
    verbose: true,
    transformIgnorePatterns: [
      '/node_modules/(?!d3-(array|format))'
    ],
    transform: {
      "^.+\\.js$": "babel-jest",
      ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
      ".+\\.(png|svg|jpg|jpeg)$": "jest-transform-stub"
    }
  };
  
  module.exports = config;