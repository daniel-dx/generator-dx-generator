'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const generatorGeneratorPkg = require('../package.json');

jest.setTimeout(1000 * 10);
jest.mock('npm-name', () => () => Promise.resolve(true));

describe('generator:app', () => {
  describe('defaults', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '../temp'))
        .withPrompts({
          name: 'generator-foo',
          seedUrl: 'https://github.com/daniel-dx/ncform-demo.git',
          description: 'A foo generator',
          homepage: 'https://github.com/daniel-dx/ncform-demo',
          githubAccount: 'dx',
          authorName: 'daniel',
          authorEmail: 'daniel@dx.com',
          authorUrl: 'http://dx.io',
          keywords: ['foo'],
          license: 'MIT'
        });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.equal(path.basename(process.cwd()), 'generator-foo');
    });

    it('creates files', () => {
      const expected = [
        'generators/app/index.js',
        'generators/app/logger.js',
        'generators/app/utils.js',
        '__tests__/app.js'
      ];

      assert.file(expected);
    });

    it('Check if the template variables are replaced correctly', () => {
      // App/index.js
      assert.fileContent(
        'generators/app/index.js',
        'git clone https://github.com/daniel-dx/ncform-demo.git --branch master --single-branch'
      );
      assert.fileContent(
        'generators/app/index.js',
        "'Welcome to the ' + chalk.red('generator-foo') + ' generator!'"
      );

      // README
      assert.fileContent(
        'README.md',
        ' install [Yeoman](http://yeoman.io) and generator-foo'
      );
      assert.fileContent('README.md', 'npm install -g generator-foo');
      assert.fileContent('README.md', 'yo foo');
    });

    it('fills package.json with correct information', () => {
      // eslint-disable-next-line new-cap
      assert.JSONFileContent('package.json', {
        name: 'generator-foo',
        dependencies: {
          'yeoman-generator': generatorGeneratorPkg.dependencies['yeoman-generator'],
          chalk: generatorGeneratorPkg.dependencies.chalk,
          yosay: generatorGeneratorPkg.dependencies.yosay,
          moment: generatorGeneratorPkg.dependencies.moment,
          'deep-extend': generatorGeneratorPkg.dependencies['deep-extend'],
          'fs-extra': generatorGeneratorPkg.dependencies['fs-extra'],
          'underscore.string': generatorGeneratorPkg.dependencies['underscore.string'],
          'replace-in-file': generatorGeneratorPkg.dependencies['replace-in-file']
        },
        devDependencies: {
          'yeoman-test': generatorGeneratorPkg.devDependencies['yeoman-test'],
          'yeoman-assert': generatorGeneratorPkg.devDependencies['yeoman-assert']
        },
        keywords: ['foo', 'yeoman-generator'],
        description: 'A foo generator',
        homepage: 'https://github.com/daniel-dx/ncform-demo',
        author: {
          name: 'daniel',
          email: 'daniel@dx.com',
          url: 'http://dx.io'
        },
        license: 'MIT',
        eslintConfig: {
          rules: {
            'prettier/prettier': 'error',
            'no-useless-escape': 'warn'
          }
        },
        scripts: {
          pretest: 'eslint . --fix'
        },
        jest: {
          testPathIgnorePatterns: ['templates', 'temp']
        }
      });
    });

    it('fills the .eslintignore with correct content', () => {
      assert.fileContent('.eslintignore', 'temp\n');
    });
  });
});
