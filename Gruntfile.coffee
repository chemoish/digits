module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-angular-templates'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jade'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    coffee:
      dev:
        files: [
          dest: 'dist/script/app.js'
          src: [
            'src/app/app.coffee'
            'src/app/**/*.coffee'
          ]
        ]

    jade:
      dev:
        files: [
          dest: 'dist/index.html'
          src: 'src/app/index.jade'
        ,
          expand: true
          cwd: 'src'
          dest: 'tmp'
          ext: '.html'
          src: [
            '**/*.jade'

            # exclude index from tmp and angular template cache
            '!app/index.jade'
          ]
        ]
        options:
          pretty: true
      prod:
        files: '<%= jade.dev.files %>'

    ngtemplates:
      app:
        dest: 'tmp/template.js'
        options:
          url: (url) ->
            url.replace('tmp/app/', '')
        src: 'tmp/**/*.html'

    stylus:
      dev:
        files: [
          dest: 'dist/style/app.css'
          src: 'src/style/app.styl'
        ]
        options:
          compress: false
          urlfunc: 'url'
      prod:
        files: '<%= stylus.dev.files %>'
        options:
          urlfunc: '<%= stylus.dev.options.urlfunc %>'

    clean:
      dev: 'tmp'

    concat:
      dev:
        files: [
          dest: 'dist/style/vendor.css'
          src: [
            'vendor/bower/foundation/css/foundation.css'
            'vendor/bower/font-awesome/css/font-awesome.css'
          ]
        ,
          dest: 'dist/script/vendor.js',
          src: [
            'vendor/bower/jQuery/jquery.js'
            'vendor/bower/angular/angular.js'
            'vendor/bower/foundation/js/foundation.js'
          ]
        ]
        
      template:
        files: [
          dest: 'dist/script/app.js'
          src: [
            'dist/script/app.js'
            '<%= ngtemplates.app.dest %>'
          ]
        ]

    connect:
      server:
        options:
          base: 'dist'
          port: 8787

    copy:
      dev:
        files: [
          cwd: 'src'
          dest: 'dist/img/'
          expand: true
          flatten: true
          src: 'img/**/*'
        ,
          cwd: 'vendor/bower'
          dest: 'dist/fonts/'
          expand: true
          flatten: true
          src: 'font-awesome/fonts/**/*'
        ,
          cwd: 'vendor/bower'
          dest: 'dist/script/'
          expand: true
          flatten: true
          src: 'modernizr/modernizr.js'
        ]

    'gh-pages':
      docs:
        options:
          base: 'tmp/doc'
        src: [
          '**'
        ]

    uglify:
      prod:
        files: [
          dest: 'dist/script/app.js'
          src: 'dist/script/app.js'
        ,
          dest: 'dist/script/modernizr.js'
          src: 'dist/script/modernizr.js'
        ,
          dest: 'dist/script/vendor.js'
          src: 'dist/script/vendor.js'
        ]

    watch:
      coffee:
        files: 'src/**/*.coffee'
        options:
          interrupt: true
        tasks: [
          'coffee:dev'
          'concat:template'
        ]

      grunt:
        files: 'Gruntfile.coffee'

      jade:
        files: 'src/**/*.jade'
        options:
          interrupt: true
        tasks: [
          'jade:dev'
          'ngtemplates:app'
          'concat:template'
        ]

      stylus:
        files: 'src/**/*.styl'
        options:
          interrupt: true
        tasks: 'stylus:dev'

  grunt.registerTask 'default', 'Running development environment...', [
    'build:dev'
    'connect'
    'watch'
  ]

  grunt.registerTask 'build:dev', 'Running development tasks...', [
    'coffee:dev'
    'jade:dev'
    'ngtemplates:app'
    'stylus:dev'
    'concat:dev'
    'concat:template'
    'copy:dev'
  ]

  grunt.registerTask 'build:prod', 'Running production tasks...', [
    'coffee:dev'
    'jade:prod'
    'ngtemplates:app'
    'stylus:prod'
    'concat:dev'
    'concat:template'
    'copy:dev'
    'uglify:prod'
  ]