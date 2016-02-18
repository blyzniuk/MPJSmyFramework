module.exports = function(config) {
	config.set({

		basePath: '',
		frameworks: ['jasmine', 'browserify'],

		files: [
			'src/*.js'
		],

		exclude: [
		],

		preprocessors: {
			'src/*.js': ['browserify']
		},

		browserify: {
			debug: true,
			transform: [
				'babelify'
			]
		},

		// define reporters, port, logLevel, browsers etc.
		port: 9876,
		singleRun: true,
		browsers: ['PhantomJS']
	});
};
