'use strict';
var LIVERELOAD_PORT = 35729;

module.exports = function (grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dev: 'processed',
        dist: 'dist',
        temp: '.tmp',
        version: '0.0.1'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            compass: {
                files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: [
                    'copy:dev',
                    'env:dev',
                    'preprocess:dev',
                    'compass:server'
                ]
            },
            styles: {
                files: ['<%%= yeoman.dev %>/<%%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['copy:styles']
            },
            app: {
                files: [
                    '<%%= yeoman.app %>/{,*/}*.html',
                    '<%%= yeoman.app %>/scripts/{,*/}*.js'
                ],
                tasks: [
                    'copy:dev',
                    'env:dev',
                    'preprocess:dev'
                ]
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%%= yeoman.app %>/*.html',
                    '<%%= yeoman.temp %>/styles/{,*/}*.css',
                    '{<%%= yeoman.temp %>,<%%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost',
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                options: {
                    base: [
                        '<%%= yeoman.temp %>',
                        '<%%= yeoman.dev %>/<%%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '<%%= yeoman.temp %>',
                        'test',
                        yeomanConfig.app
                    ]
                }
            },
            dist: {
                options: {
                    base: [
                        '<%%= yeoman.dist %>/<%%= yeoman.app %>'
                    ]
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%%= yeoman.temp %>',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '<%%= yeoman.temp %>'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/libs/*',
                'test/spec/{,*/}*.js'
            ]
        },
        compass: {
            options: {
                cssDir: '<%%= yeoman.temp %>/styles',
                generatedImagesDir: '<%%= yeoman.temp %>/images/generated',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/styles/fonts',
                importPath: '<%%= yeoman.app %>/libs',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            dist: {
                options: {
                    sassDir: '<%%= yeoman.dist %>/<%%= yeoman.app %>/styles',
                    generatedImagesDir: '<%%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    sassDir: '<%%= yeoman.dev %>/<%%= yeoman.app %>/styles',
                    debugInfo: true
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    src: [
                        '<%%= yeoman.app %>/*',
                        '<%%= yeoman.app %>/**/*'
                    ],
                    dest: '<%%= yeoman.dev %>/'
                }]
            },
            dist: {
                files: [{
                    src: [
                        '<%%= yeoman.app %>/*',
                        '<%%= yeoman.app %>/**/*'
                    ],
                    dest: '<%%= yeoman.dist %>/'
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.app %>/styles',
                dest: '<%%= yeoman.temp %>/styles/',
                src: '{,*/}*.css'
            }
        },
        concurrent: {
            server: [
                'compass',
                'copy:styles'
            ],
            dist: [
                'compass',
                'copy:styles'
            ]
        },
        cssmin: {
            dist: {
                src: [
                    '<%%= yeoman.temp %>/styles/*.css',
                    '<%%= yeoman.temp %>/styles/**/*.css'
                ],
                dest: '<%%= yeoman.dist %>/<%%= yeoman.app %>/styles/app.min.css'
            }
        },
        uglify: {
            dist : {
                files: {
                    '<%%= yeoman.dist %>/<%%= yeoman.app %>/scripts/app.min.js' : [
                        '<%%= yeoman.dist %>/<%%= yeoman.app %>/scripts/*.js',
                        '<%%= yeoman.dist %>/<%%= yeoman.app %>/scripts/**/*.js'
                    ]
                }
            }
        },
        env: {
            options: {
                VERSION: '<%%= yeoman.version %>'
            },
            dev: {
                NODE_ENV: 'development',
                DEST: '<%%= yeoman.dev %>'
            },
            dist: {
                NODE_ENV: 'production',
                DEST: '<%%= yeoman.dist %>'
            }
        },
        preprocess: {
            dev: {
                src: [
                    '<%%= yeoman.dev %>/<%%= yeoman.app %>/styles/*.(scss,sass)',
                    '<%%= yeoman.dev %>/<%%= yeoman.app %>/styles/**/*.(scss,sass)',
                    '<%%= yeoman.dev %>/<%%= yeoman.app %>/scripts/*.js',
                    '<%%= yeoman.dev %>/<%%= yeoman.app %>/scripts/**/*.js',
                    '<%%= yeoman.dev %>/<%%= yeoman.app %>/*.html',
                    '<%%= yeoman.dev %>/<%%= yeoman.app %>/**/*.html'
                ],
                options: {
                    inline: true,
                    context: {
                        production: false
                    }
                }
            },
            dist: {
                src: [
                    '<%%= yeoman.dist %>/<%%= yeoman.app %>/styles/*.(scss,sass)',
                    '<%%= yeoman.dist %>/<%%= yeoman.app %>/styles/**/*.(scss,sass)',
                    '<%%= yeoman.dist %>/<%%= yeoman.app %>/scripts/*.js',
                    '<%%= yeoman.dist %>/<%%= yeoman.app %>/scripts/**/*.js',
                    '<%%= yeoman.dist %>/<%%= yeoman.app %>/*.html',
                    '<%%= yeoman.dist %>/<%%= yeoman.app %>/**/*.html'
                ],
                options: {
                    inline: true,
                    context: {
                        production: true
                    }
                }
            }
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'copy:dev',
            'env:dev',
            'preprocess:dev',
            'concurrent:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
        'env:dist',
        'preprocess:dist',
        'concurrent:dist',
        'uglify:dist',
        'cssmin:dist',
    ]);

    grunt.registerTask('lint', [
        'jshint'
    ]);

    grunt.registerTask('default', [
        'jshint'
    ]);
};
