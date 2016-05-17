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
      this.templatePath(".*"),
      this.destinationPath(),
      this.props
    );
  },

  install: function () {
    this.npmInstall([
      'babel-cli',
      'babel-preset-es2015',
      'mocha',
      'babel-register'
    ], {saveDev: true, saveExact: true});
  }
});
