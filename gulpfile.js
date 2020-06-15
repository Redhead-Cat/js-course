const {watch, series, src, dest}=require('gulp');
const fs=require('fs');
const browserSync=require('browser-sync');
const del=require('del');

function server(){
  browserSync({
    server:{
      baseDir:'dist'
    },
    notify: false
  });
}
function files(){
  return src(['./src/*.html','./src/css/**/*.css','./src/**/*.js'])
         .pipe(dest('./dist/'));
}

function delDist() {
  return del.sync('dist');
}
  
  function watchFiles(){
    watch('./src/*.html', function(){
      return src('./src/*.html')
      .pipe(dest('./dist'))
      .pipe(browserSync.reload({stream:true}));
    });
    watch('./src/**/*.js', function(){
      return src('./src/**/*.js')
      .pipe(dest('./dist'))
      .pipe(browserSync.reload({stream:true}));
    });
    watch('./src/css/**/*.css', function(){
      return src('./src/css/**/*.css')
      .pipe(dest('./dist'))
      .pipe(browserSync.reload({stream:true}));
    });
  }

  
  exports.build=series(delDist,files);
 
  function defaultTask(cb) {
    delDist();
    files();
    server();
  }
  exports.default = series(defaultTask, watchFiles);

 
 