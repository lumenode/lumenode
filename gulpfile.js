'use strict';

var fs = require('fs');
var clean = require('gulp-clean');
var nodemon = require('nodemon');
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var coveralls = require('gulp-coveralls');
var shell = require('gulp-shell');
var isWin = /^win/.test(process.platform);
var jshint = require('gulp-jshint');

gulp.task('start', function () {
  nodemon({
    script: 'index.js',
    env: {
      'NODE_ENV': 'development'
    },
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      process.stdout.write(chunk);
    });
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('prepare', ['ob:clear', 'clean-logs', 'clean-reports'], function () {
  return '';
});

gulp.task('clean-logs', function () {
  return gulp.src('storage/logs/**/*.*', {
      read: false
    })
    .pipe(clean());
});

gulp.task('clean-reports', function () {
  return gulp.src('storage/reports/*.*', {
      read: false
    })
    .pipe(clean());
});

gulp.task('lint', function () {
  return gulp.src([
    'app/**/*.js',
    'bootstrap/**/*.js',
    'config/**/*.js',
    'index.js',
    'helpers.js'
  ])
  .pipe(excludeGitignore())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp('package.json', cb);
});

gulp.task('pre-test', function () {
  return gulp.src('lib/**/*.js')
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('startServer', ['env:testing'], function() {
  require('./index.js');
});

gulp.task('env:testing', function() {
  process.env.NODE_ENV = 'testing';
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src(['index.js', 'test/**/*.js'], {
      read: false
    })
    // .pipe(shell('clear'))
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec'
    }))
    .on('error', function (err) {
      mochaErr = err;
      console.log(err);
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
      process.exit();
    });
});

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('prepublish', function() {
  var message = fs.readFileSync('./storage/messages/ok-message.txt', 'utf8');

  console.log('\n\n' + message + '\n\n');
});
gulp.task('default', ['static', 'test', 'coveralls']);


gulp.task('tdd', function () {
  return gulp.watch(['test/**/*.js', '*.js'], ['runMocha']);
});

gulp.task('runMocha', ['env:testing', 'clean-logs'], function () {
  return gulp.src([
      'helpers.js',
      'test/**/*.js'
    ], {
      read: false
    })
    .pipe(shell(isWin ? 'cls' : 'clear'))
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('cucumber', function() {
  return gulp.src(['features/**']).pipe(shell('node node_modules/cucumber/bin/cucumber.js'));
});