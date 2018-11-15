'use strict';

const chalk = require('chalk');
const yosay = require('yosay');
const extend = require('deep-extend');
const s = require('underscore.string');
const yeoman = require('yeoman-generator');
const fs = require('fs-extra');

const logger = require('./logger');
const utils = require('./utils');


// Global Variables
let folder, folderPath;

module.exports = yeoman.Base.extend({

  /**
   * init
   */
  init() {
    this.conflicter.force = true; // 冲突直接替换, 不再询问
  },

  /**
   * 检查git是否安装
   */
  checkForGit() {
    return utils.exec('git --version');
  },

  /**
   * 打印欢迎信息
   */
  welcomeMessage() {
    logger.log(yosay(
      'Welcome to the ' + chalk.red('<%= name %>') + ' generator!'
    ));
  },

  /**
   * 询问项目的所在目录名
   */
  promptForFolder() {
    const prompt = {
      name   : 'folder',
      message: 'In which folder would you like the project to be generated? ',
      default: 'demo-project'
    };

    return this.prompt(prompt).then(props => {
      folder = props.folder;
      folderPath = './' + folder + '/';
    });
  },

  /**
   * Clone seed project
   */
  cloneRepo() {
    logger.green('Cloning the remote seed repo.......');
    return utils.exec('git clone <%= seedUrl %> --branch master --single-branch ' + folder);
  },

  /**
   * 删除clone下来的种子项目的git信息
   */
  rmGitInfo() {
    fs.removeSync(folderPath + '.git');
  },

  /**
   * 询问项目的基本信息
   */
  getPrompts() {

    const prompts = [{
      name   : 'appName',
      message: 'What would you like to call your application?',
      default: folder
    }, {
      name   : 'appDescription',
      message: 'How would you describe your application?',
      default: ''
    }, {
      name   : 'appKeywords',
      message: 'How would you describe your application in comma seperated keywords?',
      default: ''
    }, {
      name   : 'appAuthor',
      message: 'What is your company/author name?'
    }];

    return this.prompt(prompts).then(props => {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.appKeywords = props.appKeywords;
      this.appAuthor = props.appAuthor;

      this.slugifiedAppName = s(this.appName).underscored().slugify().value(); // demo-name
      this.camelAppName = s(this.slugifiedAppName).camelize().value(); // demoName
      this.firstCapCamelAppName = s(this.camelAppName).capitalize().value(); // DemoName
      this.humanizedAppName = s(this.slugifiedAppName).humanize().value(); // Demo name
      this.titleAppName = s(this.humanizedAppName).titleize().value(); // Demo Name
    });
  },

  /**
   * 更新package.json数据
   */
  updatePackage() {
    let pkg = this.fs.readJSON(this.destinationPath(folder + '/package.json'), {});
    extend(pkg, {
      name: this.slugifiedAppName,
      description: this.appDescription,
      author: this.appAuthor,
      keywords: this.appKeywords.split(',')
    });
    this.fs.writeJSON(this.destinationPath(folder + '/package.json'), pkg);
  },

    /**
   * 替换关键字标识
   */
  replaceKeywords() {
    utils.replaceFiles(folder,
      {
        // 'Daniel Panel': this.titleAppName,
        // '\\[author name\\]': this.appAuthor,
      },
      [
        'node_modules/**'
      ])
  },

  /**
   * 安装依赖module
   */
  installing() {
    logger.green('Running npm install for you....');
    logger.green('This may take a couple minutes.');

    utils.exec('cd ' + folder).then(() => {
      this.installDependencies({
        bower: false,
        npm: true,
        callback: function () {
          logger.log('');
          logger.green('------------------------------------------');
          logger.green('Your application project is ready!');
          logger.log('');
          logger.green('To Get Started, run the following command:');
          logger.log('');
          logger.yellow('cd ' + folder + ' && npm run dev'); // TODO 根据实际情况进行修改
          logger.log('');
          logger.green('Happy Hacking!');
          logger.green('------------------------------------------');
        }
      });
    });
  }
});
