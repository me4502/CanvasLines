const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
gulp.src('src/lines.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('static/js'))
);
