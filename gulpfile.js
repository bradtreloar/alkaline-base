var gulp = require('gulp')
var autoprefixer = require('gulp-autoprefixer')
var replace = require('gulp-replace')
var rename = require('gulp-rename')
var sass = require('gulp-sass')


// Perform all build tasks
gulp.task('build', ['sass', 'copy-js', 'starterkit'])


// Copy JS libraries from node modules to JS folder.
gulp.task('copy-js', () => {
  return gulp.src([
      "./node_modules/foundation-sites/dist/js/foundation.min.js",
      "./node_modules/motion-ui/dist/motion-ui.min.js",
    ])
    .pipe(gulp.dest("./js"))
})


// Copy SASS components to starterkit as partials.
gulp.task('starterkit', () => {
  return gulp.src([
      "./sass/base/typography.scss",
      "./sass/components/*.scss",
      "./sass/layout/*.scss",
      "./sass/util/*.scss",
      "./sass/_global.scss"
    ], {
      base: './sass'
    })
    .pipe(replace("@import 'global';", ""))
    .pipe(replace(/@if \$theme [^]*/, ""))
    .pipe(rename((path) => {
      // Add leading underscore to filename to change file to SASS partial.
      if (!path.basename.includes("_"))
        path.basename = "_" + path.basename;
    }))
    .pipe(gulp.dest("./starterkit/sass/alkaline"))
})


// Compile .scss files to .css
gulp.task('sass', () => {
  return gulp.src("./sass/**/*.scss")
    .pipe(sass({
      includePaths: [
        "./node_modules",
        "./sass",
      ],
    }))
    .pipe(autoprefixer({
      browsers: ["last 2 versions"],
      cascade: false
    }))
    .pipe(gulp.dest("./css"))
})


// Compile .scss files to .css when .scss files are updated.
gulp.task('watch', () => {
  gulp.watch("./sass/**/*.scss", ['sass']) 
})
