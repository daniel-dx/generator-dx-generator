'use strict';

var path = require('path');
var generators = require('yeoman-generator');
var askName = require('inquirer-npm-name');
var _ = require('lodash');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');

function makeGeneratorName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('generator-') === 0 ? name : 'generator-' + name;
  return name;
}

module.exports = generators.Base.extend({
  initializing() {
    this.props = {};
  },

  prompting() {
    return askName({
      name: 'name',
      message: 'Your generator name',
      default: makeGeneratorName(path.basename(process.cwd())),
      filter: makeGeneratorName,
      validate: str => str.length > 'generator-'.length
    }, this).then(props => {
      this.props.name = props.name;
    });
  },

  promptForSeed() {
    var prompt = {
      name   : 'seedUrl',
      message: 'What is your seed project url? ',
      default: 'https://github.com/[username]/[seed project name].git'
    };

    return this.prompt(prompt).then(props => {
      this.props.seedUrl = props.seedUrl;
    });
  },

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }

    var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));

    this.composeWith('node:app', {
      options: {
        babel: false,
        boilerplate: false,
        name: this.props.name,
        projectRoot: 'generators',
        skipInstall: this.options.skipInstall,
        readme: readmeTpl({
          generatorName: this.props.name,
          yoName: this.props.name.replace('generator-', '')
        })
      }
    }, {
      local: require('generator-node').app
    });
  },

  writing() {

    // update package.json
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    extend(pkg, {
      dependencies: {
        'yeoman-generator': '^0.23.0',
        'underscore.string': '^3.2.2',
        'deep-extend': '^0.4.0',
        chalk: '^1.0.0',
        yosay: '^1.0.0'
      },
      devDependencies: {
        'mocha': '^2.2.5',
        'mockery': '^1.4.0'
      }
    });
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('yeoman-generator');

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // add templates
    this.fs.copyTpl(
      this.templatePath('libs'),
      this.destinationPath('generators/app')
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(path.join('generators', 'app', 'index.js')),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath(path.join('test', 'app.js')),
      this.props
    );
  },

  install() {
    this.installDependencies({bower: false});
  }
});
