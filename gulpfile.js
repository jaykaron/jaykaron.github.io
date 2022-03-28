var browserSync = require('browser-sync').create();
var gulp = require('gulp');
const flatten = require("gulp-flatten");
var nunjucksRender = require('gulp-nunjucks-render');
var reload = browserSync.reload;
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');
var wrap = require("gulp-wrap");
const htmlmin = require('gulp-htmlmin');

// Static server
function browserSyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
}

const htmlMinConfig = {
  collapseWhitespace: true,
  removeComments: true
}

const build = gulp.parallel(gatherPages, gatherMedia, gatherStylesheets, gatherMarkdown);

function gatherPages(cb) {
  // Gets .html and .nunjucks files in pages
  return gulp.src('src/pages/**/*.+(html|nunjucks|njk)')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(htmlmin(htmlMinConfig))
    .pipe(gulp.dest('./build'));
} 

function gatherStylesheets(cb) {
  // place stylesheets relative to their location in src/
  // so src/pages/projects/stylesheets/private.css --> build/projects/stylesheets/private.css
  return gulp.src("./src/**/stylesheets/**/*.css", { base: "./src/pages" })
    .pipe(gulp.dest("./build"))
}

function gatherMedia(cb) {
  return gulp.src("./**/media/**")
    // all media goes into a single folder
    // they should always be referenced /media/file
    .pipe(flatten())
    .pipe(gulp.dest("./build/media"))
}

function gatherMarkdown(cb) {
  return gulp.src('./src/**/*.md', { base: "./src/pages" })
    .pipe(frontMatter({ remove: true }))
    .pipe(markdown())
    // insert the rendered markdown into the nunjucks template
    .pipe(wrap({ src: './src/templates/markdown.njk' }))
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(htmlmin(htmlMinConfig))
    .pipe(gulp.dest('./build'));
}

function watch(cb) {
  browserSyncServer(cb);
  gulp.watch('src/**/*', build);
  gulp.watch('build/**/*').on('change', reload);
}

exports.build = build;
exports.watch = watch;
