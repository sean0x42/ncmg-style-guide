// Imports
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

// Options
const stylesInput = "static/styles/**/*.scss";
const stylesOutput = "static/styles";
const sassOptions = {
  outputStyle: 'expanded'
};

const scriptsInput = "static/scripts/**/*.js";
const scriptsOutput = "static/scripts";
const renameOptions = {
  suffix: ".min"
};

/*
 * Styles
 * 1. Transpile SASS
 * 2. Add CSS prefixes
 * 3. Rename *.min.css
 * 4. Minify
 */
gulp.task("sass", function () {
  return gulp.src(stylesInput)
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(rename(renameOptions))
    .pipe(cleanCSS())
    .pipe(gulp.dest(stylesOutput));
});

/*
 * Scripts
 * 1. Rename to *.min.js
 * 2. Minify
 */
gulp.task("js", function () {
  return gulp.src(scriptsInput)
    .pipe(rename(renameOptions))
    .pipe(uglify())
    .pipe(gulp.dest(scriptsOutput));
});

gulp.task("watch", function () {
  gulp.watch([stylesInput, scriptsInput], ["sass", "js"]);
});

gulp.task("default", ["sass", "js", "watch"]);