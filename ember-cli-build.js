/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var parseFlag = require('./config/parse-flag');
var env = EmberApp.env();

module.exports = function(defaults) {
  var options = {
    inlineContent: {},
    minifyJS: {},
    minifyCSS: {},
    sourcemaps: {
      extensions: ['js']
    }
  };

  if (parseFlag('TWITTER_WIDGET', env === 'production')) {
    options.inlineContent['snippets/twitter-widget'] = 'app/snippets/twitter-widget.js';
  }

  if (parseFlag('GOOGLE_ANALYTICS', env === 'production')) {
    options.inlineContent['snippets/google-analytics'] = 'app/snippets/google-analytics.js';
  }

  options.minifyJS.enabled = parseFlag('MINIFY_JS', env === 'production');

  options.minifyCSS.enabled = parseFlag('MINIFY_CSS', env === 'production');

  options.sourcemaps.enabled = parseFlag('SOURCEMAPS', env !== 'production');

  var app = new EmberApp(defaults, options);

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
  app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');


  return app.toTree();
};
