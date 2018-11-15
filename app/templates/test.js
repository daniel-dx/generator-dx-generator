'use strict';

const path = require('path');
const mockery = require('mockery');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('<%= name %>:app', function () {

  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('npm-name', function () {
      return Promise.resolve(true);
    });
  });

  after(function () {
    mockery.disable();
  });

  describe('default', function() {
    before(function (done){
      this.timeout(60 * 1000);
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, '../temp'))
        .withPrompts({
            folder: 'hello-world',
            appName: 'hello-world',
            appDescription: 'A hello world prject',
            appKeywords: 'hello world',
            appAuthor: 'avtor'
        })
        .toPromise().then(() => done());
    });

    it('creates files', function () {
      assert.file([
        'hello-world/package.json'
      ]);
    });
  });

});
