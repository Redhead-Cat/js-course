const {watch, series, src, dest}=require('gulp');
const fs=require('fs');
const browserSync=require('browser-sync');
const less=require('gulp-less');
const autoprefixer= require('gulp-autoprefixer');
const babel = require('gulp-babel');
const del=require('del');
const babelPreset=require('@babel/preset-env');
function server(){
  browserSync({
    server:{
      baseDir:'dist'
    },
    notify: false
  });
}
function files(){
  return src(['./src/index.html','./src/**/*.js'])
         .pipe(dest('./dist/'));
}
function css(){
  return src('./src/less/**/*.less')
         .pipe(less({outputStyle:'expanded'}))

         .pipe(autoprefixer(['last 15 versions', '>0.2%'],{cascade:true}))
         .pipe(dest('./dist/'))
         .pipe(browserSync.reload({stream:true}));
}

function jsBuild(){
   return src('./src/**/*.js')
          .pipe(babel({
           presets: ['@babel/preset-env']
          }))
          .pipe(dest('./dist'))
          .pipe(browserSync.reload({stream:true}));
}

function delDist() {
  return del.sync('dist');
}
  
  function watchFiles(){
    watch('./src/index.html', function(){
      return src('./src/index.html')
      .pipe(dest('./dist'))
      .pipe(browserSync.reload({stream:true}));
    });
   watch('./src/**/*.js', jsBuild);
    
    watch('./src/less/**/*.less',css);
  }

  if(process.env.NODE_ENV ==='production'){
    exports.build=series(delDist, css,jsBuild)
  } else {
    exports.build=series(delDist,css,files);
  }
  function defaultTask(cb) {
    delDist();
    files();
    css();
    jsBuild();
    server();
  }
  exports.default = series(defaultTask, watchFiles);

 
 