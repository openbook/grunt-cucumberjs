/*
 * grunt-cucumberjs
 * https://github.com/mavdi/cucumberjs
 *
 * Copyright (c) 2013 Mehdi Avdi
 * Licensed under the MIT license.
 */

'use strict';
var report = require('./test/assert/report');

module.exports = function(grunt) {
    var options = {
        formats: ['html', 'pretty'],
        templateDir: 'templates/bootstrap',
        output: 'test/report/features_report.html',
        saveJson: true,
        theme: 'bootstrap'
    };

    function assertReport() {
        report.assert(options.output);
    }

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'package.json',
                'tasks/*.js',
                'features/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/report/*.json', 'test/report/*.html', 'test/report/screenshot/*.png']
        },

        // Configuration to be run (and then tested).
        cucumberjs: {
            options: options,
            src: ['test/features']
        },
        jsbeautifier: {
            src: ['<%= jshint.all %>']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.registerTask('assertReport', assertReport);
    // By default, lint and run all tests.
    grunt.registerTask('test', ['jshint', 'jsbeautifier', 'clean', 'cucumberjs', 'assertReport']);

};
