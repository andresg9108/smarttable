const fs = require('fs');

module.exports = function(grunt) {
    // Root
    var aRouteRoot = ['./*'];

    // Js
    var aRouteJs = ['./src/js/*'];
    var oRouteJs = {'src/js/dist/main.min.js': ['src/js/*.js']};

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            dev: {
                options: {
                    sourceMap: true
                },
                files: oRouteJs
            }
        },

        copy: {
            dist: {
                expand: true,
                cwd: 'src/js/dist/',
                src: ["main.min.js", "main.min.js.map"],
                dest: 'dist/'
            }
        },

        watch: {
            files: ['*.*'],
            options: {
                nospawn: true,
                livereload: {
                    host: 'localhost',
                    port: 35729
                }
            },
            task_root: {
                files: aRouteRoot
            },

            task_js:{
                files: aRouteJs,
                tasks: ['uglify', 'copy']
            }
        }
        
    });

    grunt.registerTask('default', ['watch']);
};