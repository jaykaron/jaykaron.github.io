var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var reload = browserSync.reload;

// Static server
function browserSyncServer(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}

function build(cb) {
  // Gets .html and .nunjucks files in pages
  return gulp.src('dev/pages/**/*.+(html|nunjucks|njk)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['dev/templates']
    }))
  // output files in root directory
  .pipe(gulp.dest('.'))
}

function watch(cb) {
  browserSyncServer(cb);
  gulp.watch('dev/(pages|templates)/**/*.+(html|nunjucks|njk)', build);
  gulp.watch('**/*.html').on('change', reload);
}

exports.build = build;
exports.watch = watch;
