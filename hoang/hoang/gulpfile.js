const gulp = require('gulp');
const { series } = require('gulp');
const requirejs = require('gulp-requirejs');
const path = require('path');
const fs = require('fs-extra');

let paths = [];

const filterJsFiles = () => {
   return gulp.src(['app/**/*.js', 'Scripts/durandal/**/*.js'])
      .on('data', function (file) {
         const filePath = file.path;
         const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
         const cleanPath = relPath.replace(/^app[\/\\]/, './').replace(/^Scripts[\/\\]/, '../Scripts/');
         paths.push(cleanPath);
      })
}

const filterHtmlFiles = () => {
   return gulp.src(['app/**/*.html'])
      .on('data', function (file) {
         const filePath = file.path;
         const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
         const cleanPath = relPath.replace(/^app[\/\\]/, 'text!./');
         paths.push(cleanPath);
      })
}

const clean = () => fs.remove('app/main-built.js');


const build = () => {
   console.log('paths', paths);
   return (requirejs({
      debug: true,
      baseUrl: 'app',
      name: 'main',
      mainConfigFile: 'app/main.js',
      out: 'app/main-built.js',
      optimize: 'none',
      paths: {
         'text': '../Scripts/text',
         'durandal': '../Scripts/durandal',
         'plugins': '../Scripts/durandal/plugins',
         'transitions': '../Scripts/durandal/transitions'
      },
      include: paths,
      //exclude: ['./main-built.js'], // dont know why this option doesnt work
      loaderPluginExtensionMaps: {
         '.html': 'text'
      },
      pragmas: {
         build: true
      },
      stubModules: ['text'],
      inlineText: true,
      preserveLicenseComments: false,
      generateSourceMaps: false,
      optimizeCss: 'standard.keepLines',
      //optimize: 'uglify2'
   })).pipe(gulp.dest('./'));
}

gulp.task('default', series(clean, filterJsFiles, filterHtmlFiles, build));
