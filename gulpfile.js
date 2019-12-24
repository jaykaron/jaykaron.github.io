var fs = require('fs');
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var reload = browserSync.reload;
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');
var wrap = require("gulp-wrap");

let rootDir = process.cwd();
let templateDir = rootDir + "/dev/templates";

// Static server
function browserSyncServer(cb) {
    browserSync.init({
        server: {
            baseDir: rootDir
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

function buildMarkdown(cb) {
  return gulp.src('../pages/**/*.md')
    .pipe(frontMatter({remove: true}))
    .pipe(markdown())
    .pipe(wrap({src:'markdown.njk'}, {}, {engine: 'nunjucks'}))
    .pipe(gulp.dest('../..'));
}


function watch(cb) {
  browserSyncServer(cb);
  gulp.watch('dev/(pages|templates)/**/*.+(html|nunjucks|njk)', build);
  gulp.watch('**/*.html').on('change', reload);
}

function watchMarkdown(cb) {
  browserSyncServer(cb);
  process.chdir(templateDir)
  gulp.watch('../pages/**/*.md', buildMarkdown);
  gulp.watch('../../**/*.html').on('change', () => {return reload();});
}

exports.build = build;
exports.watch = watch;
exports.buildMarkdown = () => {
  process.chdir(templateDir); 
  return buildMarkdown();
}
exports.watchMarkdown = watchMarkdown

