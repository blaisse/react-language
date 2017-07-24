import gulp from 'gulp';
import postCSS from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';
import importCSS from 'postcss-import';
import mixins from 'postcss-mixins';

gulp.task('styles', () => {
    return gulp.src('./style/style.css')
        .pipe(postCSS([ importCSS, mixins, autoprefixer, nested ]))
        .pipe(gulp.dest('./temp')); 
});