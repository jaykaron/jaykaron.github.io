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
  return gulp.src('app/pages/**/*.+(html|nunjucks|njk)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['app/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('app/dist'))
}

function watch(cb) {
  browserSyncServer(cb);
  gulp.watch('app/(pages|templates)/**/*.+(html|nunjucks|njk)', build);
  gulp.watch('app/dist/**/*.html').on('change', reload);
}

exports.build = build;
exports.watch = watch;
