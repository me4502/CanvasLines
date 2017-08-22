const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
gulp.src('src/lines.js')
    .pipe(babel({
        presets: ['es2015', 'minify']
    }))
    .pipe(gulp.dest('docs/js'))
);
