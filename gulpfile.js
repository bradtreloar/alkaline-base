var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('hello', function() {
  console.log('Hello World!');
});

// Compile .scss files to .css
gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(sass({
      includePaths: [
        './node_modules',
        './sass',
      ],
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'))
});

// Compile .scss files to .css when .scss files are updated.
gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['sass']); 
});