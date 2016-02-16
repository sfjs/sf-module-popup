var gulp = require('gulp');
var buildTasks = require('./config/build.js');

buildTasks();

gulp.task('default', ['build']);
gulp.task('build', ['source']);

