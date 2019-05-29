const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const replace = require("gulp-replace");
const rename = require("gulp-rename");
const sass = require("gulp-sass");

// Perform all build tasks
gulp.task("build", gulp.parallel("sass", "copy-css", "copy-js", "starterkit"));

// Copy JS libraries from node modules to JS folder.
gulp.task("copy-js", () =>
  gulp
    .src([
      "./node_modules/foundation-sites/dist/js/foundation.min.js",
      "./node_modules/motion-ui/dist/motion-ui.min.js"
    ])
    .pipe(gulp.dest("./js"))
);

// Copy CSS libraries from node modules to CSS folder.
gulp.task("copy-css", () =>
  gulp
    .src(["./node_modules/motion-ui/dist/motion-ui.min.css"])
    .pipe(gulp.dest("./css"))
);

// Copy SASS components to starterkit as partials.
gulp.task("starterkit", () =>
  gulp
    .src(
      [
        "./sass/base/typography.scss",
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

// Compile .scss files to .css
gulp.task("sass", () =>
  gulp
    .src("./sass/**/*.scss")
    .pipe(
      sass({
        includePaths: ["./node_modules", "./sass"]
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("./css"))
);

// Compile .scss files to .css when .scss files are updated.
gulp.task("watch", () => {
  gulp.watch("./sass/**/*.scss", gulp.parallel("sass"));
});
