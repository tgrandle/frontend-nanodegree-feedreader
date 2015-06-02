'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['jasmine/spec/{,*/}*.js'],
        tasks: ['jshint','jscs'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'jasmine/spec/{,*/}*.js'
      ]
    },

    //check style
    jscs: {
      src: 'jasmine/spec/{,*/}*.js',
      options: {
          config: '.jscsrc'
      }  
    },
});


  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    // 'jscs',
    // 'test',
    // 'build'
  ]);
};