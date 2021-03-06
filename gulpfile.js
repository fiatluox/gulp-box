/*
    Gulp Box | https://github.com/andreystarkov/gulp-box
*/

var gulp    = require('gulp'),
    gutil   = require('gulp-util');
    plugins = require('gulp-load-plugins')();

    gulp.task('default', ['scripts', 'styles', 'watch']);

    var theLibs = [
     'app/libs/jquery/dist/jquery.min.js',
     'app/scripts/*.js'
    ];
    gulp.task('scripts', function() {
      return gulp.src(theLibs)
        .pipe(plugins.uglify())
        .pipe(plugins.concat('scripts.js'))
        .pipe(gulp.dest('app/app'));
    });

    gulp.task('styles', function() {
        return gulp.src('app/styles/styles.less')
            .pipe(plugins.plumber())
            .pipe(plugins.less())
            .on('error', function (err) {
                gutil.log(err);
                this.emit('end');
            })
            .pipe(plugins.autoprefixer(
                {
                    browsers: [
                        '> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ],
                    cascade: false
                }
            ))
            .pipe(plugins.cssmin())
            .pipe(gulp.dest('app/app')).on('error', gutil.log);
    });

    var imagemin = require('gulp-imagemin');
    var pngquant = require('imagemin-pngquant');
    var jpegtran = require('imagemin-jpegtran');
    var gifsicle = require('imagemin-gifsicle');

    gulp.task('images', function () {
        return gulp.src(['app/images/**/*.jpg', 'app/images/**/*.png'])
            .pipe(plugins.imagemin({
                progressive: false,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant(), jpegtran(), gifsicle()]
            }))
            .pipe(gulp.dest('build/images'));
    });

    gulp.task('watch', function() {
        gulp.watch('app/libs/**/*.js', ['scripts']);
        gulp.watch('app/scripts/*.js', ['scripts']);
        gulp.watch('app/styles/**/*.less', ['styles']);
    });