import gulp from 'gulp';
import watch from 'gulp-watch';
var browserSync = require('browser-sync').create();

gulp.task('watch', () => {
    gulp.watch('./style/**/*.css', () => {
        gulp.start('cssRebuild');
    });
});

gulp.task('cssRebuild', ['styles'], () => {
    return gulp.src('./temp/style.css');
});