import gulp from "gulp";
import babel from "gulp-babel";
import eslint from "gulp-eslint";

function defaultTask() {
  // eslint
  gulp
    .src(["es6/**/*.js", "public/es6/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format());

  // node sources
  gulp.src("es6/**/*.js").pipe(babel()).pipe(gulp.dest("dist"));

  // browser sources
  gulp.src("public/es6/**/*.js").pipe(babel()).pipe(gulp.dest("public/dist"));
}

export default defaultTask;
