'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
// Const fs = require('fs');

describe('generator:subgenerator', () => {
  beforeEach(() => {
    return helpers
      .run(path.join(__dirname, '../subgenerator'))
      .cd(path.join(__dirname, '../temp/generator-foo'))
      .withArguments(['bar'])
      .withOptions({
        force: true
      });
  });

  it('creates files', () => {
    assert.file([
      'generators/bar/index.js',
      'generators/bar/templates/dummyfile.txt',
      '__tests__/bar.js'
    ]);
  });
});
