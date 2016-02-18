var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var eslint = require('gulp-eslint');
var fs = require('fs');
var browserify = require('browserify');

var path = {
    src: {
        framework: 'src/framework.js',
        frameworkCmps: 'src/**/*.js',
    },
};

gulp.task('clean', function () {
    del(['build/framework.js'], {force: true});
});

gulp.task('lint', function () {
    return gulp.src(path.src.frameworkCmps)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', ['clean', 'lint'], function () {
	return browserify(path.src.framework)
		.transform('babelify', { presets: ['es2015'] })
		.bundle()
		.pipe(fs.createWriteStream('build/framework.js'));
});

gulp.task('default', ['build']);
