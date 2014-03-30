var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    handlebars = require('gulp-ember-handlebars'),
//    declare = require('gulp-declare'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('css', function(){
    return gulp.src('scss/*.scss')
        .pipe(compass({
            sass: 'scss'
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('templates', function(){
    gulp.src(['js/templates/**/*.hbs'])
        .pipe(handlebars({
            outputType: 'browser',
            namespace: 'Ember.TEMPLATES'
        }))
        .pipe(concat("templates.js"))
        .pipe(gulp.dest('js/'));
});

gulp.task('scripts', function(){
    var scriptSrc = ['js/vendor/jquery-1.10.2.js',
                'js/vendor/jquery-ui.custom.min.js','js/vendor/moment.min.js',
                'js/vendor/moment.timezone.js','js/vendor/moment.timezone.data.js',
                'js/vendor/handlebars.runtime-v1.3.0.js',
                'js/vendor/ember-1.3.2.js', 'js/vendor/ember-data.js','js/vendor/local-storage-adapter.js',
                'js/helpers.js',
                'js/main.js','js/templates.js','js/components.js','js/models/*.js',
                'js/controllers/*.js', 'js/router.js', 'js/views/*.js',
                'js/fixtures.js','js/routes/*.js'];
    return gulp.src(scriptSrc)
//        .pipe(uglify({
//            mangle: false
//        }))
        .pipe(concat("main.min.js"))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function(){
//    var server = livereload();

    gulp.watch('scss/*.scss', function(){
        gulp.run('css');
    });

    gulp.watch('js/templates/**/*.hbs', function(){
        gulp.run('templates');
    });

    gulp.watch('js/**/*.js', function(){
        gulp.run('scripts');
    });

//    gulp.watch('dist/css/*.css', function(evt) {
//        server.changed(evt.path);
//    });
//
//    gulp.watch('dist/js/main.min.js', function(evt) {
//        server.changed(evt.path);
//    });
});

gulp.task('default', ['css','templates','scripts', 'watch']);
gulp.task('build', ['css','templates','scripts']);