var gulp        = require('gulp'), // Подключаем Gulp
    sass        = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    autoprefixer = require('gulp-autoprefixer'),//Подключаем autoprefixer
    // concat = require('gulp-concat'),
    // uglify = require('gulp-uglifyjs'),
    // cssnano = require('gulp-cssnano'),
    // rename = require('gulp-rename'),
    del = require('del');
    // smartgrid   = require('smart-grid'); //Подключаем смарт грид


//autoprefixer

gulp.task('prefix', () =>
    gulp.src('app/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
); 



gulp.task('sass', function(){ // Создаем таск Sass
    return gulp.src('app/sass/**/*.sass') // Берем источник
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        // Преобразуем Sass в CSS посредством gulp-sass compressed или expanded

        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js

});

//Сборка проэкта

gulp.task('build',['sass','scripts'], function() {
	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest(dist/css))

    //переносим шрифты
	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

    //переносим скрипты
	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

    //переносим html
	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'))
})


//очистка папки dist перед сборкой проэкта

gulp.task('clean', function() {
	return del.sync('dist');
})





// расскомментируй нужный таск  в консоли пропиши gulp и название таска ( либо именуй default и запускай просто gulp)