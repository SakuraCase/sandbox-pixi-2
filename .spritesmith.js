'use strict';

var util = require('util');

module.exports = [
  {
    src: './assets/buttons/*.{png,gif,jpg}',
    destImage: './dist/assets/buttons.png',
    destCSS: './dist/assets/buttons.json', 
    cssTemplate: require('spritesmith-texturepacker'), 
    padding: 1, 
    algorithmOpts: { sort: false },
  }
];