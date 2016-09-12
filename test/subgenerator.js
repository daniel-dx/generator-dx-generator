'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');
var mockery = require('mockery');

describe('generator:subgenerator', function () {
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('superb', function () {
      return 'cat\'s meow';
    });

    return helpers.run(path.join(__dirname, '../subgenerator'))
      .inDir(path.join(__dirname, '../temp/generator-temp'))
      .withArguments(['foo'])
      .withOptions({force: true})
      .toPromise();
  });

  after(function () {
    mockery.disable();
  });

  it('creates files', function () {
    assert.file([
      'generators/foo/index.js',
      'generators/foo/templates/dummyfile.txt',
      'test/foo.js'
    ]);
  });
  
});
