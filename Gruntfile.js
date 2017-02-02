module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mkdir: {
      all: {
        options: {
          create: ['dist/js', 'dist/css']
        }
      }
    },
    stylus: {
      compile: {
        options: {
          'compress': true,
          'include css': true
        },
        files: {
          'dist/css/style.css': 'src/styl/style.styl'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // Default task(s).
  grunt.registerTask('default', ['mkdir', 'stylus']);
};
