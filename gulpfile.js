'use strict';

// gulpの読み込み
var gulp = require('gulp');

// プラグインの読み込み
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

//ブラウザ同期タスク
gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			 baseDir: "html/"　//対象ディレクトリ
			 //,index  : "index.html"　//インデックスファイル
		}
	});
});

//ブラウザリロード
gulp.task('bs-reload', function () {
	browserSync.reload();
});

//Sass自動コンパイルタスク
gulp.task('sass', function () {
	// scssファイルを取得
	gulp.src('./html/src/scss/style.scss')
	// コンパイル実行
	.pipe(sass({
		outputStyle: 'expanded'
	})
	// Sassのコンパイルエラーを表示
	// (これがないと自動的に止まってしまう)
	.on('error', sass.logError))
	// cssフォルダー以下に保存
	.pipe(gulp.dest('./html/dist/css'));
});


//監視ファイル
gulp.task('default', ['browser-sync','sass'], function () {
	// 監視するファイルと、実行タスク名を指定
	gulp.watch("./html/*.html", ['bs-reload']);
	gulp.watch("./html/src/**/*.scss", ['sass']);
	//gulp.watch("./html/src/**/*.scss", ['bs-reload']);
	//gulp.watch("./html/dist/**/*.css", ['bs-reload']);
	gulp.watch("./html/dist/**/*.css").on('change', browserSync.reload);
	//gulp.watch("./html/*/*.scss", ['bs-reload']);
	//gulp.watch("./html/**/*.css", ['bs-reload']);
	//gulp.watch("*.js", ['bs-reload']);
});
