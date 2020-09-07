const {src, dest} = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const argv = require('yargs').argv;
const rimraf = require('rimraf');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const gulpEmpty = require('gulp-empty');
const imagemin = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ghPages = require('gulp-gh-pages');
const htmlmin = require('gulp-htmlmin');
const ttf2svg = require('gulp-ttf-svg');
const pug = require('gulp-pug');
const lessGlob = require('gulp-less-glob');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

const production = argv.production;

const _dist = `dist`;
const _src = `src`;

const path = {
    build: {
        views: `${_dist}/`,
        css: `${_dist}/css/`,
        img: `${_dist}/img/`,
        fonts: `${_dist}/fonts/`,
        js: `${_dist}/js/`
    },
    src: {
        views: `${_src}/views/index.pug`,
        less: `${_src}/less/index.less`,
        img: `${_src}/img/**/*`,
        fonts: `${_src}/fonts/**/*.ttf`,
        js: [`${_src}/js/libs/*.js`, `${_src}/js/**/*.js`]
    },
    watch: {
        views: `${_src}/views/**/*.pug`,
        css: [`${_src}/less/**/*.less`, `${_src}/views/**/*.less`],
        img: `${_src}/img/**/*.svg`,
        js: `${_src}/js/**/*.js`
    },
    clean: `./${_dist}/`
};

gulp.task('deploy', () => src(`${_dist}/**/*`).pipe(ghPages({
    remoteUrl: 'https://github.com/lafferty0550/TOXIN.git',
    branch: 'gh-pages'
})));

const browserSync = () => {
    browsersync.init({
        server: {
            baseDir: path.build.views
        },
        port: 3000,
        notify: false
    });
};

const views = () => {
    return src(path.src.views)
        .pipe(pug({basedir: './'}))
        .pipe(production ? htmlmin({ collapseWhitespace: true }) : gulpEmpty())
        .pipe(dest(path.build.views))
        .pipe(browsersync.stream());
};

const css = () => {
    return src(path.src.less)
        .pipe(lessGlob())
        .pipe(less())
        .pipe(groupMedia())
        .pipe(autoprefixer())
        .pipe(production ? cleanCSS() : gulpEmpty())
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
};

const images = () => {
    return src(path.src.img)
        .pipe(production ? imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3
        }) : gulpEmpty())
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
};

const fonts = (cb) => {
    src(path.src.fonts)
        .pipe(dest(path.build.fonts));
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    src(path.src.fonts)
        .pipe(ttf2svg())
        .pipe(dest(path.build.fonts));
    return cb();
};

const js = () => {
    return src(path.src.js)
        .pipe(concat('counter.js'))
        .pipe(production ? uglify() : gulpEmpty())
        .pipe(dest(path.build.js));
};

const watchFiles = () => {
    gulp.watch([path.watch.views], views);
    gulp.watch(path.watch.css, css);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.js], js);
};

const clean = (cb) => {
    rimraf(path.clean, () => {
        console.log('Dist folder was deleted');
        cb();
    });
};

const build = gulp.series(clean, gulp.parallel(views, css, images, fonts, js));

let tasks = [build];
if (!production)
    tasks = [...tasks, watchFiles, browserSync];
const watch = gulp.parallel(tasks);

exports.views = views;
exports.css = css;
exports.images = images;
exports.fonts = fonts;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch;