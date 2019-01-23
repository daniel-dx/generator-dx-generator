'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');
const glob = require('glob');
const path = require('path');
const s = require('underscore.string');
const logger = require('../app/logger');
const utils = require('../app/utils');

module.exports = class extends Generator {
  prompting() {
    // Let prompts = [{
    //   type: 'string',
    //   name: 'name',
    //   message: 'Would you like to enable this option?',
    //   default: 'name'
    // }];
    // return this.prompt(prompts).then(props => {
    //   // To access props later use this.props.someAnswer;
    //   this.props = props;
    //   // example: name = demo-user
    //   this.props.componentName = s(this.props.name).underscored().slugify().value(); // => demo-user
    //   this.props.camelComponentName = s(this.props.componentName).camelize().value(); // => demoUser
    //   this.props.firstCapCamelComponentName = s(this.props.camelComponentName).capitalize().value(); // => DemoUser
    // });
  }

  copyTemplates() {
    // Let done = this.async();
    // glob(this.templatePath() + "/**/*.*", {}, (er, files) => {
    //   _.each(files, filePath => {
    //     let toFileName = path.parse(filePath).base;
    //     this.fs.copyTpl(
    //       filePath,
    //       path.join(this.destinationPath(toFileName)),
    //       this.props
    //     );
    //   });
    //   done();
    // });
  }

  updateContent() {
    // Utils.rewriteFile({
    //   filePath  : this.destinationPath('src/components/App.vue'),
    //   insertPrev: true,
    //   needle    : "<!-- Don't touch me -->",
    //   splicable : [
    //     `<${this.componentName}></${this.componentName}>`
    //   ]
    // });
  }

  usageTip() {
    logger.log('=========================');
    logger.log('Congratulations, completed successfully!');
    logger.log('Gook Luck!');
    logger.log('=========================');
  }
};
