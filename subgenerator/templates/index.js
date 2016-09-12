'use strict';

var _ = require('lodash');
var glob = require("glob");
var path = require('path');
var s = require('underscore.string');
var yeoman = require('yeoman-generator');

var common = require('../app/common');
var logger = require('../app/logger');
var util = require('../app/util');

var scrFolderPath, scrFolder;

module.exports = yeoman.Base.extend({

  prompting() {

    // var prompts = [{
    //   type: 'string',
    //   name: 'name',
    //   message: 'Would you like to enable this option?',
    //   default: true
    // }];

    // return this.prompt(prompts).then(props => {
    //   // To access props later use this.props.someAnswer;
    //   this.props = props;

    //   // example: name = demo-user
    //   this.props.componentName = s(this.props.name).slugify().value(); // => demo-user
    //   this.props.camelComponentName = s(this.props.componentName).camelize().value(); // => demoUser
    //   this.props.firstCapCamelComponentName = s(this.props.camelComponentName).capitalize().value(); // => DemoUser

    //   scrFolder = 'src/components/' + this.componentName;
    //   scrFolderPath = './' + scrFolder + '/';

    // });

  },

  copyTemplates() {

    // var done = this.async();

    // glob(this.templatePath() + "/**/*.*", {}, (er, files) => {
    //   _.each(files, filePath => {
    //     var toFileName = path.parse(filePath).base;
    //     self.fs.copyTpl(
    //       filePath,
    //       path.resolve(scrFolderPath, toFileName),
    //       this.props
    //     );
    //   });

    //   done();
    // });

  },

  updateContent() {

    // var fullPath = 'src/components/App.vue';
    // util.rewriteFile({
    //   file      : fullPath,
    //   insertPrev: true,
    //   needle    : "<!-- Don't touch me -->",
    //   splicable : [
    //     `<${this.componentName}></${this.componentName}>`
    //   ]
    // });

  },

  usageTip() {
    logger.log('=========================');
    logger.log('Congratulations, completed successfully!');
    logger.log("Gook Luck!");
    logger.log('=========================');
  }

});
