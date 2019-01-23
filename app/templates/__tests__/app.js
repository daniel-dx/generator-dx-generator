'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

jest.setTimeout(1000 * 60);
jest.mock('npm-name', () => () => Promise.resolve(true));

describe('generator:app', () => {
  describe('defaults', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '../temp'))
        .withPrompts({
          name: 'demo-bar',
          appName: 'demo-bar',
          appDescription: 'just a demo project',
          appKeywords: 'demo,bar',
          appAuthor: 'Sarah'
        });
    });

    it('created and CD into a folder named like the demo-bar', () => {
      assert.equal(path.basename(process.cwd()), 'demo-bar');
    });
  });
});
