const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const replace = require("gulp-replace");
const rename = require("gulp-rename");
const sass = require("gulp-sass");

// Compile .scss files to .css
gulp.task("build:css", () =>
  gulp
    .src("./sass/**/*.scss")
    .pipe(
      sass({
        includePaths: ["./node_modules", "./sass"]
      })
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(gulp.dest("./css"))
);

// Compile .scss files to .css
gulp.task("build:js", () =>
  gulp
    .src("./js/**/*.es6.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(
      rename(path => {
        // Replace the ".es6.js" extension with just ".js".
        path.basename = path.basename.replace(".es6", "");
      })
    )
    .pipe(gulp.dest("./js"))
);

// Copy CSS libraries from node modules to CSS folder.
gulp.task("copy:css", () =>
  gulp
    .src(["./node_modules/motion-ui/dist/motion-ui.min.css"])
    .pipe(gulp.dest("./css"))
);

// Copy JS libraries from node modules to JS folder.
gulp.task("copy:js", () =>
  gulp
    .src([
      "./node_modules/foundation-sites/dist/js/foundation.min.js",
      "./node_modules/motion-ui/dist/motion-ui.min.js"
    ])
    .pipe(gulp.dest("./js"))
);

// Copy SASS components to starterkit as partials.
gulp.task("starterkit", () =>
  gulp
    .src(
      [
        "./sass/components/*.scss",
        "./sass/layout/*.scss",
        "./sass/theme/*.scss",
        "./sass/util/*.scss",
        "./sass/_global.scss"
      ],
      {
        base: "./sass"
      }
    )
    .pipe(replace("@import 'global';", ""))
    .pipe(replace("@include alkaline-", "// @include alkaline-"))
    .pipe(
      rename(path => {
        // Add leading underscore to filename to change file to SASS partial.
        if (!path.basename.includes("_")) path.basename = `_${path.basename}`;
      })
    )
    .pipe(gulp.dest("./starterkit/sass/alkaline"))
);

// Compile .scss files to .css when .scss files are updated.
gulp.task("watch:css", () => {
  gulp.watch("./sass/**/*.scss", gulp.parallel("build:css"));
});

// Compile .scss files to .css when .scss files are updated.
gulp.task("watch:js", () => {
  gulp.watch("./js/**/*.es6.js", gulp.series("build:js"));
});

// Perform all build tasks
gulp.task(
  "build",
  gulp.parallel("build:css", "build:js", "copy:css", "copy:js", "starterkit")
);
