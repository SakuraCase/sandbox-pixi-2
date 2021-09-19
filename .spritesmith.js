'use strict';

var util = require('util');

module.exports = [
  {
    src: './assets/animations/charaUp/*.{png,gif,jpg}',
    destImage: './dist/assets/animations/charaUp.png',
    destCSS: './dist/assets/animations/charaUp.json', 
    cssTemplate: require('spritesmith-texturepacker'), 
    padding: 1, 
    algorithmOpts: { sort: false },
  },
  {
    src: './assets/animations/charaDown/*.{png,gif,jpg}',
    destImage: './dist/assets/animations/charaDown.png',
    destCSS: './dist/assets/animations/charaDown.json', 
    cssTemplate: require('spritesmith-texturepacker'), 
    padding: 1, 
    algorithmOpts: { sort: false },
  },
  {
    src: './assets/animations/charaRight/*.{png,gif,jpg}',
    destImage: './dist/assets/animations/charaRight.png',
    destCSS: './dist/assets/animations/charaRight.json', 
    cssTemplate: require('spritesmith-texturepacker'), 
    padding: 1, 
    algorithmOpts: { sort: false },
  },
  {
    src: './assets/animations/charaLeft/*.{png,gif,jpg}',
    destImage: './dist/assets/animations/charaLeft.png',
    destCSS: './dist/assets/animations/charaLeft.json', 
    cssTemplate: require('spritesmith-texturepacker'), 
    padding: 1, 
    algorithmOpts: { sort: false },
  },
  {
    src: './assets/animations/chara/*.{png,gif,jpg}',
    destImage: './dist/assets/animations/chara.png',
    destCSS: './dist/assets/animations/chara.json', 
    cssTemplate: require('spritesmith-texturepacker'), 
    padding: 1, 
    algorithmOpts: { sort: false },
  },
];