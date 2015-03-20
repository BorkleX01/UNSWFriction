/*global require, process*/
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        "pkg": "<json:package.json>",
        "projName": "unsw-eng-friction",
        "projVersion": "0.1.0",
        "deployFragment": "repo/sims/<%= projName %>",
        "playCDNURL": "https://playroom.smartsparrow.com/",
        "uatCDNURL": "https://dthcbntahytly.cloudfront.net/",
        "prodCDNURL": "https://d1rpkia8qpfj4t.cloudfront.net/",
        "hash": Date.now(),
        "requireScript": "<script type=\"text/javascript\">requirejs.config({ baseUrl: \"scripts\" });require([\"config\"], function() { require([\"main\"]); });</script>",
        "clean": {
            "local": {
                "src": [
                    "temp/local",
                    "dist/local"
                ],
                "options": {
                    "force": true
                }
            },
            "release": {
                "src": [
                    "temp",
                    "dist"
                ],
                "options": {
                    "force": true
                }
            }
        },
        "jshint": {
            "all": [
                "Gruntfile.js",
                "app/scripts/**/*.js",
                "test/specs/**/*.js"
            ],
            "options": {
                "curly": false,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "sub": true,
                "undef": true,
                "boss": true,
                "eqnull": true,
                "onecase": true,
                "scripturl": true,
                "globals": {
                    "exports": true,
                    "module": false,
                    "define": false,
                    "describe": false,
                    "xdescribe": false,
                    "it": false,
                    "xit": false,
                    "beforeEach": false,
                    "afterEach": false,
                    "expect": false
                }
            }
        },
        "less": {
            "local": {
                "options": {
                    "paths": [
                        "app/styles",
                        "bower_components/common/app/styles"
                    ]
                },
                "files": [
                    {
                        "dest": "temp/local/css/<%= projName %>.css",
                        "src": [
                            "app/styles/start.less"
                        ]
                    }
                ]
            },
            "play": {
                "options": {
                    "paths": "<%= less.local.options.paths %>",
                    "compress": true
                },
                "files": [
                    {
                        "dest": "temp/play/css/<%= projName %>.css",
                        "src": "app/styles/start.less"
                    }
                ]
            },
            "uat": {
                "options": "<%= less.play.options %>",
                "files": [
                    {
                        "dest": "temp/uat/css/<%= projName %>.css",
                        "src": "app/styles/start.less"
                    }
                ]
            },
            "prod": {
                "options": "<%= less.uat.options %>",
                "files": [
                    {
                        "dest": "temp/prod/css/<%= projName %>.css",
                        "src": "app/styles/start.less"
                    }
                ]
            }
        },
        "copy": {
            "localCompile": {
                "files": [
                    {
                        "dest": "dist/local/index.html",
                        "src": [
                            "index.html"
                        ]
                    },
                    {
                        "dest": "dist/local/scripts/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/scripts/",
                        "expand": true
                    },
                    {
                        "dest": "dist/local/templates/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/templates/",
                        "expand": true
                    },
                    {
                        "dest": "dist/local/assets/<%= hash %>/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/assets/",
                        "expand": true
                    }
                ]
            },
            "release": {
                "files": [
                    {
                        "dest": "dist/play/<%= deployFragment %>/index.html",
                        "src": [
                            "index.html"
                        ]
                    },
                    {
                        "dest": "temp/play/scripts/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/scripts/",
                        "expand": true
                    },
                    {
                        "dest": "temp/play/templates/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/templates/",
                        "expand": true
                    },
                    {
                        "dest": "dist/play/<%= deployFragment %>/assets/<%= hash %>/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/assets/",
                        "expand": true
                    },
                    {
                        "dest": "dist/uat/<%= deployFragment %>/index.html",
                        "src": [
                            "index.html"
                        ]
                    },
                    {
                        "dest": "temp/uat/scripts/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/scripts/",
                        "expand": true
                    },
                    {
                        "dest": "temp/uat/templates/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/templates/",
                        "expand": true
                    },
                    {
                        "dest": "dist/uat/<%= deployFragment %>/assets/<%= hash %>/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/assets/",
                        "expand": true
                    },
                    {
                        "dest": "dist/prod/<%= deployFragment %>/index.html",
                        "src": [
                            "index.html"
                        ]
                    },
                    {
                        "dest": "temp/prod/scripts/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/scripts/",
                        "expand": true
                    },
                    {
                        "dest": "temp/prod/templates/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/templates/",
                        "expand": true
                    },
                    {
                        "dest": "dist/prod/<%= deployFragment %>/assets/<%= hash %>/",
                        "src": [
                            "**"
                        ],
                        "cwd": "app/assets/",
                        "expand": true
                    }
                ]
            },
            "prodVersion": {
                "files": [
                    {
                        "dest": "dist/uat/<%= deployFragment %>/<%= hash %>.html",
                        "src": [
                            "dist/uat/<%= deployFragment %>/index.html"
                        ]
                    },
                    {
                        "dest": "dist/prod/<%= deployFragment %>/<%= hash %>.html",
                        "src": [
                            "dist/prod/<%= deployFragment %>/index.html"
                        ]
                    }
                ]
            }
        },
        "watch": {
            "styles": {
                "files": [
                    "app/styles/**"
                ],
                "tasks": [
                    "localStyle"
                ]
            },
            "code": {
                "files": [
                    "app/**",
                    "!app/styles/**",
                    "test/**/*.js"
                ],
                "tasks": [
                    "local"
                ]
            },
            "tddCode": {
                "files": [
                    "app/**",
                    "!app/styles/**",
                    "test/**/*.js"
                ],
                "tasks": [
                    "localTestFirst"
                ]
            },
            "copyOnly": {
                "files": [
                    "app/**",
                    "!app/styles/**",
                    "test/**/*.js"
                ],
                "tasks": [
                    "localCopyOnly"
                ]
            }
        },
        "requirejs": {
            "play": {
                "options": {
                    "baseUrl": "temp/play/scripts",
                    "mainConfigFile": "app/scripts/config.js",
                    "name": "../../../bower_components/almond/almond",
                    "include": "main",
                    "insertRequire": [
                        "main"
                    ],
                    "out": "dist/play/<%= deployFragment %>/js/<%= hash %>.js",
                    "wrap": false
                }
            },
            "uat": {
                "options": {
                    "baseUrl": "temp/uat/scripts",
                    "mainConfigFile": "app/scripts/config.js",
                    "name": "../../../bower_components/almond/almond",
                    "include": "main",
                    "insertRequire": [
                        "main"
                    ],
                    "out": "dist/uat/<%= deployFragment %>/js/<%= hash %>.js",
                    "wrap": false
                }
            },
            "prod": {
                "options": {
                    "baseUrl": "temp/prod/scripts",
                    "mainConfigFile": "app/scripts/config.js",
                    "name": "../../../bower_components/almond/almond",
                    "include": "main",
                    "insertRequire": [
                        "main"
                    ],
                    "out": "dist/prod/<%= deployFragment %>/js/<%= hash %>.js",
                    "wrap": false
                }
            }
        },
        "templateFile": {
            "local": {
                "file": "dist/local/index.html",
                "options": {
                    "data": {
                        "jsUrl": "../../bower_components/requirejs/require.js",
                        "cssUrl": "css/<%= projName %>.css",
                        "version": "- v<%= projVersion %>",
                        "requireScript": "<%= requireScript %>"
                    }
                }
            },
            "localCSS": {
                "file": "dist/local/css/<%= projName %>.css",
                "options": {
                    "data": {
                        "imagePath": "../assets/<%= hash %>"
                    }
                }
            },
            "localEnvironment": {
                "file": "dist/local/scripts/env.js",
                "options": {
                    "data": {
                        "imagePath": "assets/<%= hash %>"
                    }
                }
            },
            "play": {
                "file": "dist/play/<%= deployFragment %>/index.html",
                "options": {
                    "data": {
                        "jsUrl": "<%= playCDNURL %><%= deployFragment %>/js/<%= hash %>.js",
                        "cssUrl": "<%= playCDNURL %><%= deployFragment %>/css/<%= hash %>.css",
                        "version": "- v<%= projVersion %>",
                        "requireScript": ""
                    }
                }
            },
            "playCSS": {
                "file": "dist/play/<%= deployFragment %>/css/<%= hash %>.css",
                "options": {
                    "data": {
                        "imagePath": "<%= playCDNURL %><%= deployFragment %>/assets/<%= hash %>"
                    }
                }
            },
            "playEnvironment": {
                "file": "temp/play/scripts/env.js",
                "options": {
                    "data": {
                        "imagePath": "./assets/<%= hash %>"
                    }
                }
            },
            "uat": {
                "file": "dist/uat/<%= deployFragment %>/index.html",
                "options": {
                    "data": {
                        "jsUrl": "<%= uatCDNURL %><%= deployFragment %>/js/<%= hash %>.js",
                        "cssUrl": "<%= uatCDNURL %><%= deployFragment %>/css/<%= hash %>.css",
                        "version": "- v<%= projVersion %>",
                        "requireScript": ""
                    }
                }
            },
            "uatCSS": {
                "file": "dist/uat/<%= deployFragment %>/css/<%= hash %>.css",
                "options": {
                    "data": {
                        "imagePath": "<%= uatCDNURL %><%= deployFragment %>/assets/<%= hash %>"
                    }
                }
            },
            "uatEnvironment": {
                "file": "temp/uat/scripts/env.js",
                "options": {
                    "data": {
                        "imagePath": "./assets/<%= hash %>"
                    }
                }
            },
            "prod": {
                "file": "dist/prod/<%= deployFragment %>/index.html",
                "options": {
                    "data": {
                        "jsUrl": "<%= prodCDNURL %><%= deployFragment %>/js/<%= hash %>.js",
                        "cssUrl": "<%= prodCDNURL %><%= deployFragment %>/css/<%= hash %>.css",
                        "version": "",
                        "requireScript": ""
                    }
                }
            },
            "prodCSS": {
                "file": "dist/prod/<%= deployFragment %>/css/<%= hash %>.css",
                "options": {
                    "data": {
                        "imagePath": "<%= prodCDNURL %><%= deployFragment %>/assets/<%= hash %>"
                    }
                }
            },
            "prodEnvironment": {
                "file": "temp/prod/scripts/env.js",
                "options": {
                    "data": {
                        "imagePath": "./assets/<%= hash %>"
                    }
                }
            }
        },
        "mocha": {
            "dot": {
                "src": [
                    "test/index.html"
                ]
            },
            "bamboo": {
                "src": "<%= mocha.dot.src %>",
                "options": {
                    "reporter": "bamboo-mocha-reporter/lib/bamboo.js"
                },
                "dest": "temp/test/mocha.json"
            }
        },
        "bless": {
            "local": {
                "files": [
                    {
                        "dest": "dist/local/css/<%= projName %>.css",
                        "src": "temp/local/css/<%= projName %>.css"
                    }
                ]
            },
            "release": {
                "files": [
                    {
                        "dest": "dist/play/<%= deployFragment %>/css/<%= hash %>.css",
                        "src": "temp/play/css/<%= projName %>.css"
                    },
                    {
                        "dest": "dist/uat/<%= deployFragment %>/css/<%= hash %>.css",
                        "src": "temp/uat/css/<%= projName %>.css"
                    },
                    {
                        "dest": "dist/prod/<%= deployFragment %>/css/<%= hash %>.css",
                        "src": "temp/prod/css/<%= projName %>.css"
                    }
                ]
            }
        },
        "parallel": {
            "watch": {
                "options": {
                    "grunt": true,
                    "stream": true
                },
                "tasks": [
                    "watch:code",
                    "watch:styles"
                ]
            },
            "tddwatch": {
                "options": {
                    "grunt": true,
                    "stream": true
                },
                "tasks": [
                    "watch:tddCode",
                    "watch:styles"
                ]
            },
            "copywatch": {
                "options": {
                    "grunt": true,
                    "stream": true
                },
                "tasks": [
                    "watch:copyOnly",
                    "watch:styles"
                ]
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-mocha");
    grunt.loadNpmTasks("grunt-bless");
    grunt.loadNpmTasks("grunt-template-file");
    grunt.loadNpmTasks("grunt-parallel");
    grunt.loadNpmTasks("grunt-build-generator");


    // Define grunt tasks
    var watchToUse = 'parallel:' + (process.env.gruntWatch || '') + 'watch';
    grunt.registerTask("localTemplate", ["templateFile:local","templateFile:localCSS","templateFile:localEnvironment"]);
    grunt.registerTask("local", ["clean:local","jshint","copy:localCompile","less:local","bless:local","localTemplate","mocha:dot"]);
    grunt.registerTask("localStyle", ["clean:local","copy:localCompile","less:local","bless:local","localTemplate"]);
    grunt.registerTask("localCopyOnly", ["clean:local","copy:localCompile","less:local","bless:local","localTemplate"]);
    grunt.registerTask("localTestFirst", ["clean:local","copy:localCompile","less:local","bless:local","localTemplate","mocha:dot","jshint"]);
    grunt.registerTask("rel", ["clean","jshint","copy:localCompile","copy:release","less","bless","templateFile","mocha:bamboo","requirejs","copy:prodVersion","mocha:bamboo"]);
    grunt.registerTask("default", ["local",watchToUse]);
    grunt.registerTask("copyOnlyWatch", ["localCopyOnly","parallel:copywatch"]);
    grunt.registerTask("tddWatch", ["localTestFirst","parallel:tddwatch"]);
    grunt.registerTask("build", ["grunt-generator"]);

};
