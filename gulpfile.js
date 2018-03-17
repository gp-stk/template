'use strict';

// gulpの読み込み
var gulp = require('gulp');

// プラグインの読み込み
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

// sass自動コンパイルタスク
gulp.task('sass', function(){
	gulp.src('./src/scss/**.scss')
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	// Sassのコンパイルエラーを表示
	// (これがないと自動的に止まってしまう)
	//.on('error', sass.logError)
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./html/common/css'));
});

// ブラウザ同期タスク
gulp.task('browser-sync', function() {
    browserSync({
        server: {
			 //baseDir: "html"
			 baseDir: ["html", "src"] //対象ディレクトリ
            //,index  : "index.html" //インデックスファイル
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// watchタスク(html,js,sassファイル変更時に実行するタスク)
gulp.task('sass-watch', ['sass','browser-sync'], function(){
	gulp.watch("./src/**/*.scss", ['sass']);
	gulp.watch("./html/*.html",['bs-reload']);
	gulp.watch("./src/**/*.scss",['bs-reload']);
});

gulp.task('default', ['sass-watch','browser-sync']);
