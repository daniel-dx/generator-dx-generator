'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator:<%= name %>', () => {
  beforeEach(() => {
    return (
      helpers
        .run(path.join(__dirname, '../generators/<%= name %>'))
        .cd(path.join(__dirname, '../temp/demo-<%= name %>'))
        .withPrompts({
          name: 'demo'
        })
        .withOptions({
          force: true
        })
    );
  });

  it('creates files', () => {
    assert.file(['demo/dummyfile.txt']);
  });
});
