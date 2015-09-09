//Gruntfile
module.exports = function(grunt) {
	//Initializing the configuration object
	grunt.initConfig({

	    // configure jshint to validate js files -----------------------------------
	    jshint: {
	      options: {
	        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
	      },

	      // when this task is run, lint the Gruntfile and all js files in src
	      build: ['Gruntfile.js', 'src/**/*.js']
	    },
	    less: {
      		build: {
        		files: {
          			'src/css/style.css': 'src/css/style.less'
        		}
      		}
    	},
    	wiredep: {
			task: {

			    // Point to the files that should be updated when
			    // you run `grunt wiredep`
			    src: [
			      '*.html',   // .html support...
			    ]
			}
		},
		    // configure uglify to minify js files -------------------------------------
	    uglify: {
	      options: {
	        banner: '/*\n <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
	      },
	      build: {
	        files: {
	          'dist/js/audio-app.min.js': ['src/js/audio-app.js'] 
	        }
	      }
	    },
	        // configure cssmin to minify css files ------------------------------------
	    cssmin: {
	      options: {
	        banner: '/*\n <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
	      },
	      build: {
	        files: {
	          'dist/css/style.min.css': 'src/css/style.css'
	        }
	      }
	    },
		watch: {
		  // for stylesheets, watch css and less files 
		  // only run less and cssmin stylesheets: { 
		  css:{ 
		  	files: ['src/**/*.less'], tasks: ['less', 'cssmin'] },

		  // for scripts, run jshint and uglify 
		  scripts: { 
		    files: 'src/**/*.js', tasks: ['jshint', 'uglify'] 
		  } 
		},
		karma: {  
			unit: {
				options: {
					frameworks: ['jasmine'],
					singleRun: true,
					browsers: ['Firefox'],
					files: [
				      'bower_components/angular/angular.js',
				      'bower_components/angular-mocks/angular-mocks.js',
				      'test/*.js',
				      'src/js/*.js' 
					]
				}
			}
		}

	});

// Plugin loading

// Task definition
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-karma'); 

  grunt.registerTask('default', ['watch']); 
  grunt.registerTask('test', ['jshint', 'karma']);
};