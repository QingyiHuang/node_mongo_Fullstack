var gulp = require('gulp')
var jshint = require('gulp-jshint')


gulp.task('jshint', function () {
    gulp.src('./public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter()); // 输出检查结果
});

gulp.task('default',['jshint'])