import gulp from "gulp";
import babel from "gulp-babel";
import eslint from "gulp-eslint";

function eslintTask() {
  return gulp
    .src(["es6/**/*.js", "public/es6/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format());
}

function babelTask() {
  gulp.src("es6/**/*.js").pipe(babel()).pipe(gulp.dest("dist"));

  // browser sources
  return gulp
    .src("public/es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/dist"));
}

export default gulp.series(eslintTask, babelTask);
