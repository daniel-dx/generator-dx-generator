'use strict';
const Generator = require('yeoman-generator');
const s = require('underscore.string');
const logger = require('../app/logger');
const utils = require('../app/utils');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'string',
        name: 'name',
        message: "What's your demo name?",
        default: 'hello-daniel'
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
      // Example: name = demo-user
      this.props.demoName = s(this.props.name)
        .underscored()
        .slugify()
        .value(); // => demo-user
      this.props.camelDemoName = s(this.props.demoName)
        .camelize()
        .value(); // => demoUser
      this.props.firstCapCamelDemoName = s(this.props.camelDemoName)
        .capitalize()
        .value(); // => DemoUser
    });
  }

  copyTemplates() {
    return this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(this.props.demoName),
      this.props
    );
  }

  updateContent() {
    // 注意：不要去操作copyTemplates所涉及的文件，要操作已经确认存在的文件
    return utils.rewriteFile({
      filePath: this.destinationPath('README.md'),
      insertPrev: true,
      needle: "<!-- Don't touch me -->",
      splicable: [`Hi Daniel`]
    });
  }

  usageTip() {
    logger.log('=========================');
    logger.log('Congratulations, completed successfully!');
    logger.log('Gook Luck!');
    logger.log('=========================');
  }
};
