'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglifycss = require('gulp-uglifycss');
const filesize = require('gulp-filesize');
const rigger = require('gulp-rigger');

// create folders -> /src: js, img, fonts, scss; /build: js, img, fonts, css;
const strSrc = 'src';
const strTrg = 'build';

// 1. delete all files from target
gulp.task('clean', (done) => {
    try {
        del.sync([
            './' + strTrg + '/**/*'
        ]);
    } catch (e) {
        console.log('Error CLEAN > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
})

// 2. compile scss -> css
// 3. add vendor preffixes into css
// 4. concat, minify, copying -> css
gulp.task('scss', (done) => {
    try {
        gulp.src('./' + strSrc + '/scss/**/*.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(concat('style.css'))
            .pipe(filesize())
            .pipe(uglifycss({
                "maxLineLen": 80,
                "uglyComments": true
            }))
            .pipe(rename('style.min.css'))
            .pipe(gulp.dest('./' + strTrg + '/css'))
            .pipe(filesize());
    } catch (e) {
        console.log('Error SCSS > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
})
gulp.task('scss-dev', (done) => {
    try {
        gulp.src('./' + strSrc + '/scss/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('./' + strTrg + '/css'))
            .pipe(filesize())
            .pipe(uglifycss({
                "maxLineLen": 80,
                "uglyComments": true
            }))
            .pipe(rename('style.min.css'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./' + strTrg + '/css'))
            .pipe(filesize());
    } catch (e) {
        console.log('Error SCSS > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
})

// 5. concat, minify, copying -> js
gulp.task('js', (done) => {
    try {
        gulp.src('./' + strSrc + '/js/**/*.js')
            .pipe(rigger())
            .pipe(concat('bundle.js'))
            .pipe(filesize())
            .pipe(uglify())
            .pipe(rename('bundle.min.js'))
            .pipe(gulp.dest('./' + strTrg + '/js'))
            .pipe(filesize());
    } catch (e) {
        console.log('Error JS > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
})
gulp.task('js-dev', (done) => {
    try {
        gulp.src('./' + strSrc + '/js/**/*.js')
            .pipe(rigger())
            .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            .pipe(gulp.dest('./' + strTrg + '/js'))
            .pipe(filesize())
            .pipe(uglify())
            .pipe(rename('bundle.min.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./' + strTrg + '/js'))
            .pipe(filesize());
    } catch (e) {
        console.log('Error JS > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
})

// 6. optimize images and copying to target
gulp.task('img', (done) => {
    try {
        gulp.src('./' + strSrc + '/img/**/*')
            .pipe(imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: true
                }],
                use: [pngquant()]
            }))
            .pipe(gulp.dest('./' + strTrg + '/img'));
    } catch (e) {
        console.log('Error IMG > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
})

// 7. minifying and copying html etc to target
gulp.task('html', (done) => {
    try {
        gulp.src('./' + strSrc + '/**/*.html')
            .pipe(rigger())
            .pipe(htmlmin({
                collapseWhitespace: true,
            }))
            .pipe(gulp.dest('./' + strTrg));
    } catch (e) {
        console.log('Error CopyHtml > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
})
gulp.task('html-dev', (done) => {
        try {
            gulp.src('./' + strSrc + '/**/*.html')
                .pipe(rigger())
                .pipe(gulp.dest('./' + strTrg));
        } catch (e) {
            console.log('Error html > ' + e.name + ":" + e.message + "\n" + e.stack);
        }
        done();
    })
    // 8. copying other files etc to target
gulp.task('copyFilesAll', (done) => {
    try {
        gulp.src([
                './' + strSrc + '/README.md',
                './' + strSrc + '/CHANGELOG',
                './' + strSrc + '/LICENSE',
                './' + strSrc + '/*.ico',
            ])
            .pipe(gulp.dest('./' + strTrg));
    } catch (e) {
        console.log('Error CopyFilesAll > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
})

gulp.task('copyFonts', (done) => {
    try {
        gulp.src('./' + strSrc + '/fonts/**/*')
            .pipe(gulp.dest('./' + strTrg + '/fonts'));
    } catch (e) {
        console.log('Error CopyFonts > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
})

// 9. make directories
gulp.task('directories', (done) => {
    try {
        gulp.src('*.*', {
                read: false
            })
            .pipe(gulp.dest('./' + strTrg + '/css'))
            .pipe(gulp.dest('./' + strTrg + '/js'))
            .pipe(gulp.dest('./' + strTrg + '/img'))
            .pipe(gulp.dest('./' + strTrg + '/fonts'));
    } catch (e) {
        console.log('Error DIRECTORIES > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
});

// 10. packet process
gulp.task('packet', gulp.parallel('scss', 'js', 'html', 'img', 'copyFonts', 'copyFilesAll'))
gulp.task('packet-dev', gulp.parallel('scss-dev', 'js-dev', 'html-dev', 'img', 'copyFonts', 'copyFilesAll'))

// DEV
gulp.task('watch', (done) => {
    try {
        browserSync.init({
            server: './build/'
        });
        gulp.watch('./' + strSrc + '/scss/**/*.scss', gulp.series('scss-dev')).on('change', browserSync.reload);
        gulp.watch('./' + strSrc + '/js/**/*.js', gulp.series('js-dev')).on('change', browserSync.reload);
        gulp.watch('./' + strSrc + '/**/*.html', gulp.series('html-dev')).on('change', browserSync.reload);
        gulp.watch('./' + strSrc + '/img/**/*', gulp.series('img')).on('change', browserSync.reload);
    } catch (e) {
        console.log('Error WATCH > ' + e.name + ":" + e.message + "\n" + e.stack);
    }
    done();
})
gulp.task('dev', gulp.series('clean', 'directories', 'packet-dev', 'watch'))

// BUILD
gulp.task('build', gulp.series('clean', 'directories', 'packet'))