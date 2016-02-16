module.exports = function(grunt) {
	grunt.initConfig({
		watch:{
			options:{livereload:true},
			files:['AngularTests/**', 'server/**'],
			tasks:[]
		},
		express:{
			all:{
				options:{
					port:3000,
					hostname:'localhost',
					bases:['./'],
					livereload:true
				}
			}
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-express");
	grunt.registerTask("server", ["express", "watch"]);
	
};
