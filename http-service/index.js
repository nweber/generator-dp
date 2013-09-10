'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var HttpServiceGenerator = module.exports = function HttpServiceGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the http_service subgenerator with the argument ' + this.name + '.');
};

util.inherits(HttpServiceGenerator, yeoman.generators.NamedBase);

HttpServiceGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
