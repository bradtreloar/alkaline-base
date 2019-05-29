const gulp = require("gulp");
const sass = require("gulp-sass");

// Compile .scss files to .css
gulp.task("sass", () => {
  return gulp
    .src("sass/**/*.scss")
    .pipe(
      sass({
        includePaths: ["./node_modules", "./sass"]
      })
    )
    .pipe(gulp.dest("css"));
});

// Compile .scss files to .css when .scss files are updated.
gulp.task("watch", () => {
  gulp.watch("sass/**/*.scss", gulp.series("sass"));
});
