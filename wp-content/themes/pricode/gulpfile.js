'use strict';

// Gulp file to automate the various tasks

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const header = require("gulp-header");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
const sassUnicode = require('gulp-sass-unicode');
const pkg = require('./package.json');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sassLint = require('gulp-sass-lint');

// Set the banner content
const banner = ['/*!\n',
  ' * Theme Name: <%= pkg.title %>\n',
  ' * Author: <%= pkg.author %>\n',
  ' * Author URI: http://pricode.io/\n',
  ' * Description: <%= pkg.description %>\n',
  ' * Version: <%= pkg.version %>\n',
  ' * Copyright 2019-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (http://www.gnu.org/licenses/gpl-2.0.html)\n',
  ' * At Pricode we believe that you should reach for your dreams.\n',
  ' * You are welcome to use this theme privately or commercially you want to help accomplish those dreams!\n',
  ' */\n',
  '\n'
].join('');

// Copy third party libraries from /node_modules into /dist/vendor
gulp.task('vendor', function(cb) {


  // Font Awesome
  gulp.src([
      './node_modules/@fortawesome/**/*',
    ])
    .pipe(gulp.dest('./dist/vendor'));

  // Simple Line Icons
  gulp.src([
      './node_modules/simple-line-icons/fonts/**',
    ])
    .pipe(gulp.dest('./dist/vendor/simple-line-icons/fonts'));

  gulp.src([
      './node_modules/simple-line-icons/dist/css/**',
    ])
    .pipe(gulp.dest('./dist/vendor/simple-line-icons/dist/css'));

  cb();

});

// CSS task
function css() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      quietDeps: true
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      //browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(sassUnicode())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browsersync.stream());
}

//Lint SASS
function scsslint(done) {
    gulp.src("./src/scss/**/*.s+(a|c)ss")
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
    done();
}

// JS Tasks
function js() {
  return gulp
    .src([
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './src/js/**/*.js'
    ])
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest("./dist/js"))
    .pipe(browsersync.stream());
}

// Tasks
gulp.task("scss", scsslint);
gulp.task("css", css);
gulp.task("js", js);

// Minify images
function img() {
    gulp.src("./src/img/**/*.{jpg,jpeg,png,gif}")
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/img"));
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch("./src/js/**/*", js);
  gulp.watch("./src/scss/**/*", css);
  gulp.watch("./src/scss/**/*.s+(a|c)ss", scsslint);
  gulp.watch("./src/img/**/*.{jpg,jpeg,png,gif}", img);
  gulp.watch("./**/*.php", browserSyncReload);
}

gulp.task("build", gulp.parallel('vendor', css, js));

// dev task
gulp.task("dev", gulp.parallel(watchFiles, browserSync));
