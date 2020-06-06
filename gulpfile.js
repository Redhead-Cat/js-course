const {watch, series, src, dest}=require('gulp');
const fs=require('fs');
const browserSync=require('browser-sync');
const less=require('gulp-less');
const autoprefixer= require('gulp-autoprefixer');
const babel = require("@babel/core");
function server(){
  browserSync({
    server:{
      baseDir:'dist'
    },
    notify: false
  });
}
function files(){
  return src(['./src/index.html','./build/js/main.js'])
         .pipe(dest('./dist/'));
}
function css(){
  return src('./src/less/**/*.less')
         .pipe(less({outputStyle:'expanded'}))

         .pipe(autoprefixer(['last 15 versions', '>0.2%'],{cascade:true}))
         .pipe(dest('./dist/'))
         .pipe(browserSync.reload({stream:true}));
}

//function jsBuild(){
//   return src('./build/**/*.js')
 //         .pipe(dest('./dist'))
 //         .pipe(browserSync.reload({stream:true}));
//}
function clean(cb){
  if(fs.existsSync('./dist')){
    const files=fs.readdirSync('./dist');

    files.forEach(f=>{
      fs.unlinkSync(`./dist/${f}`);
    });
    fs.rmdirSync('./dist');
  }
  cb();
};
  
  function watchFiles(){
    watch('./src/index.html', function(){
      return src('./src/index.html')
      .pipe(dest('./dist'))
      .pipe(browserSync.reload({stream:true}));
    });
    watch('./src/**/*.js', function(){
      return src('./build/**/*.js')
      .pipe(dest('./dist'))
      .pipe(browserSync.reload({stream:true}));
    });
    watch('./src/less/**/*.less',css);
  }

  if(process.env.NODE_ENV ==='production'){
    exports.build=series(clean, css/*,jsBuild*/)
  } else {
    exports.build=series(clean,css,files);
  }
  function defaultTask(cb) {
    clean(cb);
    files();
    css();
    server();
  }
  exports.default = series(defaultTask, watchFiles);

