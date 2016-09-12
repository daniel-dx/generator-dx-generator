'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var superb = require('superb');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.argument('namespace', {
      type: String,
      required: true,
      description: 'Generator namespace'
    });
  },

  writing() {

    var generatorName = this.fs.readJSON(this.destinationPath('package.json')).name;

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(path.join('generators', this.namespace, 'index.js'))
    );

    this.fs.copy(
      this.templatePath('templates/**'),
      this.destinationPath(path.join('generators', this.namespace, 'templates'))
    );

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/' + this.namespace + '.js'),
      {
        namespace: this.namespace,
        generatorName: generatorName
      }
    );
  }
});
