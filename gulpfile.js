var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')
var minify = require('gulp-clean-css')
var concat = require('gulp-concat')

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src(['src/scss/**/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
})

// Compile all CSS and JS into Single File
gulp.task('concatCSS', function () {
  return gulp.src([
    'src/css/bootstrap.min.css',
    'src/css/mdb.css'
  ])
    .pipe(concat('addfldl.css'))
    .pipe(minify())
    .pipe(gulp.dest('src/css'))
})

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './src'
  })

  gulp.watch(['src/scss/*.scss'], ['sass'])
  gulp.watch(['src/css/*.css'], ['concatCSS']).on('change', browserSync.reload)
  gulp.watch('src/*.html').on('change', browserSync.reload)
})

gulp.task('default', ['concatCSS', 'serve'])
