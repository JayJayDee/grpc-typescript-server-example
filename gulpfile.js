
var gulp = require('gulp');
var typescript = require('gulp-tsc');
var runseq = require('run-sequence');
var spawn = require('child_process').spawn;
var run = require('gulp-run');

var paths = {
  tsPath: 'src/**/*.ts',
  jsPath: 'bin',
  tsDefPath: 'src/protos/**/*.d.ts',
  protoSrc: 'src/**/*.js',
  protoDst: 'bin'
};

var node;
gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['bin/app.js'], {stdio: 'inherit'});
  node.on('close', function(code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('build-proto', function() {
  return run('./gen-protobufs.sh').exec();
});

gulp.task('build-typescript', function() {
  return gulp.src(paths.tsPath)
    .pipe(typescript({
      emitError: false,
      target: 'es2017',
      sourceMap: true,
      declaration: gulp.src(paths.tsDefPath)
    }))
    .pipe(gulp.dest(paths.jsPath));
});

gulp.task('default', function () {
  runseq('build-typescript', 'build-proto', 'server');
  gulp.watch('src/**/*.ts', function() {
    runseq('build-typescript', 'server');
  });
});
 