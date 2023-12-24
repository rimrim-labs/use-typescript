import gulp from "gulp";
import babel from "gulp-babel";

function defaultTask() {
  // node sources
  gulp.src("es6/**/*.js").pipe(babel()).pipe(gulp.dest("dist"));

  // browser sources
  gulp.src("public/es6/**/*.js").pipe(babel()).pipe(gulp.dest("public/dist"));
}

export default defaultTask;
