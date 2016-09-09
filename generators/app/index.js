'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stylish ' + chalk.red('generator-babel') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Module name'
    }, {
      type: 'input',
      name: 'description',
      message: 'Module description'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('.*'),
      this.destinationPath(),
      this.props
    );
  },

  install: function () {
    this.npmInstall([
      'babel-cli',
      'babel-preset-es2015',
      'babel-preset-es2016',
      'babel-preset-es2017',
      'babel-preset-stage-3',
      'babel-preset-stage-2',
      'mocha',
      'babel-register',
      'babel-eslint',
      'eslint',
      'eslint-config-airbnb',
      'eslint-plugin-babel',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react'
    ], {saveDev: true, saveExact: true});
    this.npmInstall([
      'babel-polyfill'
    ], {saveExact: true});
  }
});
