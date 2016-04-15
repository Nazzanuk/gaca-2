var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    karma = require('gulp-karma'),
    istanbul = require('istanbul'),
    babel = require("gulp-babel"),
    ejs = require("gulp-ejs"),
    webserver = require('gulp-webserver');

var paths = {
    src: 'src/',
    release: 'release/',
    public: 'release/public/'
};

var catchError = function (e) {
    console.log('>>> ERROR', e);
    // emit here
    this.emit('end');
};

gulp.task("default", function () {
    gulp.start([
        'copy-public',
        'gen-css-lib',
        'gen-css',
        'gen-js-lib',
        'gen-js',
        'gen-html',
        'gen-new-css',
        'gen-new-js'
    ]);
});

gulp.task("gen-new-css", function () {
    return gulp.src(['src/new/global/global.scss','src/new/**/*.scss'])
        .pipe(concat('new-app.css'))
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.public));
});

gulp.task("gen-new-js", function () {
    return gulp.src(['src/new/global/global.es6', 'src/new/**/*.es6', 'src/new/**/*.js'])
        .pipe(concat('new-app.js'))
        .pipe(babel())
        .on('error', catchError)
        .pipe(gulp.dest(paths.public));
});

gulp.task("gen-css", function () {
    return gulp.src(['src/app.scss'])
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.public));
});

gulp.task("gen-css-lib", function () {
    return gulp.src([
        'src/bower-components/bootstrap/dist/css/bootstrap.min.css'
    ])
        .pipe(concat('lib.css'))
        .pipe(gulp.dest(paths.public));
});

gulp.task("gen-js", function () {
    return gulp.src(['src/app.js', 'src/components/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.public));
});

gulp.task("gen-js-lib", function () {
    return gulp.src([
        'src/bower-components/jquery/dist/jquery.min.js',
        'src/bower-components/jquery-ui/jquery-ui.min.js',
        //'src/bower-components/jqueryui-touch-punch/jquery.ui.touch-punch.js',
        'src/bower-components/angular/angular.min.js',
        'src/bower-components/velocity/velocity.min.js',
        'src/bower-components/velocity/velocity.ui.min.js',
        'src/bower-components/underscore/underscore-min.js',
        'src/bower-components/moment/moment.js',
        'src/bower-components/rxjs/dist/rx.all.js',
        'src/bower-components/bootstrap/dist/js/bootstrap.js'
    ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(paths.public));
});

gulp.task("copy-public", function () {
    return gulp.src(['src/public/**/*.*'])
        .pipe(gulp.dest(paths.public));
});

gulp.task("gen-html", function () {
    var pages = {
        "arabic-index": ['arabic-head', 'small-login', 'contact', 'arabic-menu', 'login', 'popup', 'arabic-header', 'arabic-banner', 'slider', 'arabic-home-boxes'],
        index: ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'banner', 'slider', 'home-boxes'],
        "e-services-search": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'e-search'],
        "e-catalogue": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'e-catalogue'],
        "e-service": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'e-service'],
        "search": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'search'],
        "arabic-search": ['arabic-head', 'small-login', 'contact', 'arabic-menu', 'login', 'popup', 'arabic-header', 'search'],
        "gallery": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'gallery'],
        "department": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'department'],
        "content": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'content'],
        "dashboard": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'dashboard'],
        "register": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'register'],
        "flights": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'flights'],
        "2-col": ['head', 'small-login', 'contact', 'menu', 'login', 'popup', 'header', 'template-2-col']
    };

    for (var i in pages) {
        var sources = [];
        for (var j in pages [i]) {
            var ejs = pages[i][j];
            sources.push("src/components/" + ejs + "/" + ejs + ".ejs");
        }
        sources.push("src/new/**/*.html");
        sources.push("src/components/footer/footer.ejs");

        gulp.src(sources)
            .pipe(concat(i + ".html"))
            .pipe(gulp.dest(paths.release));
    }

    gulp.src("src/new/**/*.html")
        .pipe(concat("new-directives.html"))
        .pipe(gulp.dest(paths.public));
});

gulp.task('watch', ['default'], function () {
    gulp.watch([
        'src/components/**/*',
        'src/new/**/*',
        'src/public/**/*',
        'src/app.scss',
        'src/app.js'
    ], ['default']);
});

gulp.task('webserver', function () {
    gulp.src('release')
        .pipe(webserver({
            livereload: {
                port: 11001,
                enable: true
            },
            open: true,
            port: 11000
        }));
});