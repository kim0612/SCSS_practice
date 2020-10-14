import gulp from "gulp";
import del from "del";
import sass from "gulp-sass";
import minify from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";

sass.compiler = require("node-sass");


const routes = {
  css: {
    watch: "src/scss/*",
    src: "src/scss/styles.scss",
    dest: "dest/css"
  }
};


const task_styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace"
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));

const task_watch = () => {
  gulp.watch(routes.css.watch, task_styles);
};

const task_clean = () => del(["dest/"]);


const prepare = gulp.series([task_clean]);
const assets = gulp.series([task_styles]);
const live = gulp.parallel([task_watch]);


export const dev = gulp.series([prepare, assets, live]);
