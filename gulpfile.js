var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var reload = browserSync.reload;
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');
var wrap = require("gulp-wrap");
const htmlmin = require('gulp-htmlmin');

let rootDir = process.cwd();
let templateDir = rootDir + "/src/templates";

// Static server
function browserSyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: rootDir + "/build"
    }
  });
}

const htmlMinConfig = {
  collapseWhitespace: true,
  removeComments: true
}

const build = gulp.parallel(pages, media, stylesheets);

function pages(cb) {
  // Gets .html and .nunjucks files in pages
  return gulp.src('src/pages/**/*.+(html|nunjucks|njk)')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(htmlmin(htmlMinConfig))
    .pipe(gulp.dest('./build'));
} 

function stylesheets(cb) {
  return gulp.src("./src/stylesheets/**/*.css")
    .pipe(gulp.dest("./build/stylesheets"))
}

function buildMarkdown(cb) {
  return gulp.src('../pages/**/*.md')
    .pipe(frontMatter({ remove: true }))
    .pipe(markdown())
    .pipe(wrap({ src: 'markdown.njk' }, {}, { engine: 'nunjucks' }))
    .pipe(htmlmin(htmlMinConfig))
    .pipe(gulp.dest('../../build'));
}

function media(cb) {
  return gulp.src("./src/media/**")
    .pipe(gulp.dest("./build/media"))
}

function watch(cb) {
  browserSyncServer(cb);
  gulp.watch('src/(pages|templates)/**/*.+(html|nunjucks|njk)', build);
  gulp.watch('build/*.html').on('change', reload);
}

function watchMarkdown(cb) {
  browserSyncServer(cb);
  process.chdir(templateDir)
  gulp.watch('../pages/**/*.md', buildMarkdown);
  gulp.watch('../../**/*.html').on('change', () => { return reload(); });
}

exports.build = build;
exports.watch = watch;
exports.buildMarkdown = () => {
  process.chdir(templateDir);
  return buildMarkdown();
}
exports.watchMarkdown = watchMarkdown

