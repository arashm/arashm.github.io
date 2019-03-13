---
layout: post.liquid
title: شروع کار با Gulp
published_date: 2014-05-15 07:26:00 +0000
---

{m:info}(نوشته از [Mark Goodyear](http://twitter.com/markgdyr) از [اینجا](http://markgoodyear.com/2014/01/getting-started-with-gulp/))

اگر روبی کار باشید، احتمالا با [Guard](https://github.com/guard/guard) آشنا هستین. به طور خلاصه [Gulp](http://gulpjs.com) همون Guard دنیای جاوا اسکریپت است. Gulp سیاست کد-دربرابر-پیکربندی داره. ینی برخلاف Grunt که برای تنظیم باید از کلیدهای پیش‌فرض خودش استفاده کنید و پیکربندی‌اش کنید، Gulp در واقع همون کد زدن برای node.js هست. بنابراین میشه از همه کتابخانه‌های npm در فایل تنظیمات Gulp استفاده کرد.

Gulp از استریم‌های node.js استفاده میکنه که باعث میشه buildها سریع‌تر ساخته بشن و برای ساخت اونها احتیاجی به ایجاد پرونده‌ها و پوشه‌های موقت نیست. اگر می‌خواهید بیشتر در مورد استریم‌های بدونید - با اینکه احتیاجی نیست - میتونید [این مقاله](https://github.com/substack/stream-handbook) رو بخونید. Gulp، برعکس Grunt که باید پیکربندی هر پلاگین رو بهش بدید، به شما اجازه میده که پرونده‌های پروژه‌تون رو بهش بدید، Gulp از طریق pipeها اونها رو از پلاگین‌هاش عبور میده و خروجی رو در نهایت به شما ارائه میکنه. بزارید یک مثال برای ساخت پرنده Sass در هر دو ابزار Grunt و Gulp رو ببینیم تا تفاوتشون بیشتر درک بشه:

## Grunt

```javascript
sass: {
  dist: {
    options: {
      style: 'expanded'
    },
    files: {
      'dist/assets/css/main.css': 'src/styles/main.scss',
    }
  }
},

autoprefixer: {
  dist: {
    options: {
      browsers: [
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
      ]
    },
    src: 'dist/assets/css/main.css',
    dest: 'dist/assets/css/main.css'
  }
},

grunt.registerTask('styles', ['sass', 'autoprefixer']);
```

برای Gulp باید هر پلاگین رو جداگانه پیکربندی کنید، پرونده‌های ورودی و محل خروجی رو هم براش مشخص کنید. برای مثال، ما اول باید یک پرونده ورودی رو به پلاگین Sass بدیم، که بعد پرنده خروجی رو برمیگردونه. بعد از اون باید خروجی پلاگین Sass رو به پلاگین Autoprefixer بدیم، که یک فایل دیگه رو به خروجی میده. حالا همین کار رو با Gulp انجام میدیم:

## Gulp

```javascript
gulp.task('sass', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'compressed' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
});
```

با Gulp ما یکبار پرونده رو بهش میدیم. این پرونده توسط پلاگین Sass تغییر داده میشه، بعد پلاگین Autoprefixer ارسال میشه و تغییر داده میشه و در نهایت یک پرونده خارج میشه. این پروسه سرعت ساخت پرونده نهایی رو بیشتر میکنه، چون احتیاجی به ساخت پرونده‌های موقت مختلف برای تولید یک پرونده نهایی نیست.

خب. حالا که فهمیدیم Gulp چقدر خوب‌تره، نصبش می‌کنیم و چندتا کار مختلف باهاش انجام میدیم.

## نصب Gulp

برای نصب عبارت زیر رو تو ترمینال وارد کنید. ممکنه احتیاج باشه `sudo` رو هم وارد کنید:

```shell
$ npm install gulp -g
```

این باعث میشه دسترسی به فرمان `gulp` رو در همه جای سیستم داشته باشیم. بعد از این Gulp باید به شکل محلی در مکان پروژه هم نصب بشه. `cd` کنید در محل پروژه و فرمان زیر رو اجرا کنید (مطمئن بشید که یک پرونده `package.json`دارید):

```shell
$ npm install gulp --save-dev
```

این فرمان Gulp رو به صورت محلی در پروژه شما نصب میکنه و اون رو در `devDependencies` در پرونده `package.json` اضافه میکنه.

## نصب پلاگین‌های Gulp

ما تعدادی پلاگین برای انجام کارهای زیر رو نصب می‌کنیم:

* کامپایل Sass (آدرس [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass))
* Autoprefixer (آدرس [gulp-autoprefixer](https://github.com/Metrime/gulp-autoprefixer))
* خلاصه کردن CSS (آدرس [gulp-minify-css](https://github.com/jonathanepollack/gulp-minify-css))
* JSHint (آدرس [gulp-jshint](https://github.com/wearefractal/gulp-jshint))
* چسباندن پرونده‌ها (آدرس [gulp-concat](https://github.com/wearefractal/gulp-concat))
* Uglify (آدرس [gulp-uglify](https://github.com/terinjokes/gulp-uglify))
* فشرده‌کردن عکس‌ها (آدرس [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin))
* بارگذاری مجدد صفحه در مرورگر (آدرس [gulp-livereload](https://github.com/vohof/gulp-livereload))
* پاک کردن پرونده‌ها برای ساختن تمیز هر بیلد (آدرس [gulp-clean](https://github.com/peter-vilja/gulp-clean))
* فقط عکس‌های تغییر کرده فشرده بشن (آدرس [gulp-cache](https://github.com/jgable/gulp-cache/))
* اعلام تغییرات انجام شده (آدرس [gulp-notify](https://github.com/mikaelbr/gulp-notify))

برای نصب این پلاگین‌ها فرمان زیر رو بزنید:

```shell
$ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-clean gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev
```

این فرمان تمام پلاگین‌های مورد نیاز رو نصب و بد هم در قسمت `devDependencies` پرونده `package.json` اضافه می‌کنه. فهرست کامل پلاگین‌های Gulp رو می‌تونید [اینجا](http://gratimax.github.io/search-gulp-plugins/) ببینید.

## بارگیری پلاگین‌ها

بعد از این لازم هست که یک پرونده `gulpfile.js` بسازیم و پلاگین‌هامون رو بهش معرفی کنیم:

```javascript
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
```

پلاگین‌های Gulp متفاوت از پلاگین‌های Grunt هستن. اونها طوری نوشته شدن که فقط یک کار انجام بدن و اون کار رو درست و خوب انجام بدن (سیاست برنامه‌های گنو/لینوکسی هست درواقع اینجا :دی). مثلا، `imagemin` در Grunt از کش کردن برای فشرده نکردن عکس‌هایی که قبلا فشرده شدن استفاده میکنه. با Gulp، اینکار با یک پلاگین cache انجا میشه، که میشه برای کش کردن چیزهای دیگه هم ازش استفاده کرد. این کار انعطاف‌پذیری بیشتری به پروسه ساخت میده.

میشه پلاگین‌ها رو [خودکار بارگیری](https://github.com/jackfranklin/gulp-load-tasks) کرد، اما برای این پست ما به همین روش دستی قناعت می‌کنیم!

## ساخت وظیفه‌ها (Task)

### کامپایل پرونده Sass، استفاده از Autoprefix و کوچک کردن پرونده‌ها

اول از همه، ما کامپایل Sass رو پیکربندی می‌کنیم. ما پرونده Sass رو به شکل expanded کامپایل می‌کنیم، بعد می‌فرستیمش برای Autoprefixer و در محل مورد نظرمون قرارش می‌دیم. بعد از اون یک نسخه `.min` هم ازش می‌سازیم، صفحه مرورگر رو به طور خودکار دوباره بارگیری می‌کنیم بعد هم یک اعلان به ما خبر میده که کار Gulp تموم شده:

```javascript
gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
```

کمی توضیحات بیشتر، قبل از اینکه ادامه بدیم.

```javascript
gulp.task('styles', function() { ... )};
```

این API مربوط به `gulp.task` هست که برای ساخت هر وظیفه مختلف Gulp استفاده میشه. وظیفه‌ای که بالا ساختیم رو می‌تونیم با عبارت `$ gulp styles` اجرا کنیم.

```javascript
return gulp.src('src/styles/main.scss')
```

سینتکس مربوط به `gulp.src` که پرونده‌های ورودی رو باهاش مشخص می‌کنیم. ورودی این قسمت می‌تونه یک الگو کلی مثل `/**/*.scss` باشه. با برگردوندن (`return`) استریم، وظیفه‌ای که تعریف کردیم asynchronous میشه و مطمئن میشیم که وظیفه قبل از اعلانِ پیامِ اتمام، تمام کارها رو کامل انجام داده.

```javascript
.pipe(sass({ style: 'expanded' }))
```

ما از `.pipe()` برای انتقال پرونده‌ها به پلاگین‌ها استفاده می‌کنیم. معمولا گزینه‌های مربوط به هر پلاگین رو میتونید صفحه گیت‌هابشون ببینید. من لینک‌های اونها رو بالا براتون گذاشتم.

```javascript
.pipe(gulp.dest('dist/assets/css'));
```

سینتکس بالا مربوط به `gulp.dest` است که آدرس خروجی رو بهش میدیم. هر وظیفه می‌تونه تعدادی بیشتر از یک دونه خروجی داشته باشه. مثلا یک خروجی پرونده expanded رو ذخیره می‌کنه و خروجی دیگه پرونده خلاصه شده. این کار رو ما در مثال بالا انجام دادیم.

من پیشنهاد می‌کنم [مستندات API](https://github.com/gulpjs/gulp/blob/master/docs/API.md) مربوط به Gulp رو بخونید تا درک بهتری از API داشته باشین. اونقدری که به نظر میاد ترسناک نیست!

## استفاده از JSHint و concat و خلاصه کردن جاوااسکریپت

احتمالا تا الان نحوه نوشتن یک وظیفه برای Gulp رو یاد گرفتین. در ادامه، ما کدها رو برای lint و concat و همچنین uglify اضافه می‌کنیم:

```javascript
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
```

یک نکته اینکه ما باید برای JSHint از یک گزارشگر استفاده کنیم. من از همون گزارشگر پیش‌فرض استفاده می‌کنم که احتمالا برای اکثر توسعه‌دهنده‌ها کافی است. اطلاعات بیشتر رو می‌تونید تو [سایت JSHint](http://www.jshint.com/docs/reporters/) ببینید.

## فشرده کردن عکس‌ها

در ادامه، فشرده‌سازی عکس‌ها رو انجام می‌دیم:

```javascript
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});
```

این کد تمام عکس‌ها رو میگیره و بعد میفرسته برای پلاگین `imagemin`. میشه بیشتر ادامه داد و از امکان کش کردن برای اینکه عکس‌های فشرده شده رو دوباره فشرده‌سازی نکنیم، استفاده کرد. برای اینکار فقط به پلاگین [gulp-cache](https://github.com/jgable/gulp-cache) احتیاج داریم - که قبلا نصبش کردیم. برای اینکار باید خط زیر رو:

```javascript
.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
```

به شکل زیر اصلاح کنیم:

```javascript
.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
```

حالا فقط عکس‌هایی که فشرده نشدن یا جدید هستن فشرده میشن. باحاله!

## تمیزکاری!

قبل از فرستادن پروژه به سرور، بهتره که پوشه‌های مقصدمون رو تمیز کنیم و پرونده‌ها رو دوباره بسازیم - برای اینکه مطمئن بشیم که پرونده‌هایی که ممکنه از سورس اصلی حذف کردیم، نسخه ساخته شدشون تو پوشه مقصد نباشه هنوز:

```javascript
gulp.task('clean', function() {
  return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], {read: false})
    .pipe(clean());
});
```

ما حتی می‌تونیم یک آرایه از پوشه‌ها (یا پرونده‌ها) رو به `gulp.src` بدیم. با توجه به اینکه احتیاجی نیست پرونده‌هایی که حذف شدن رو بخونیم، میتونیم `read: false` رو به گزینه‌ها اضافه کنیم تا به Gulp بگیم احتیاجی به خوندن محتویات پرونده‌ها نیست - کمی سرعتش بیشتر میشه.

## تعریف وظیفه پیش‌فرض

می‌تونیم یک وظیفه پیش‌فرض اضافه کنیم تا وقتی دستور `$ gulp` رو میزنیم اجرا بشه و هر سه وظیفه‌ای که برای Gulp تعریف کردیم رو اجرا کنه:

```javascript
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
```

به آرایه‌ای که به `gulp.task` اضافه شدن دقت کنین. اینجا جایی هست که می‌تونیم وابستگی‌های این وظیفه رو مشخص کنیم. اینطوری وظیفه‌ی `clean`، که قبلا تعریف کردیم، پیش از وظیفه‌های داخل `gulp.start` اجرا میشه. وظیفه‌ها داخل Gulp به شکل همروند (concurrent) باهم اجرا میشه و هیچ ترتیبی که کدوم زودتر تموم میشه وجود نداره، بنابراین لازمه که مطمئن بشیم که `clean` قبل از بقیه اجرا شده.

## پاییدنِ پرونده‌ها!

برای اینکه تغییرات پرونده‌ها رو زیرنظر بگیریم و وظیفه‌های لازم رو وقتی که تغییر کردن خودکار اجرا کنیم، باید اول یک وظیفه جدید تعریف کنیم، بعد با `gulp.watch‍` تغییرات پرونده‌ها رو زیر نظر بگیریم:

```javascript
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

});
```

ما پرونده‌هایی که میخوایم زیر نظر بگیریم رو با استفاده از `gulp.watch` تعریف می‌کنیم. حالا می‌تونیم دستور `$ gulp watch` رو اجرا کنیم و با هر تغییری تو پرونده‌هامون، Gulp وظیفه‌اش رو انجام میده!

## بارگیری خودکار صفحه در مرورگر

Gulp می‌تونه صفحه مرورگر شما رو وقتی پرونده‌ها تغییر میکنن خودش دوباره بارگیری کنه. فقط لازمه که وظیفه‌ی `watch` رو که بالا نوشتیم رو کمی تغییر بدیم و سرور LiveReload رو بهش اضافه کنیم:

```javascript
gulp.task('watch', function() {

  // Create LiveReload server
  var server = livereload();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', function(file) {
    server.changed(file.path);
  });

});
```

## سرهم‌بندی کد

این کل پرونده gulp که نوشتیم:

```javascript
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

// Styles
gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  var server = livereload();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', function(file) {
    server.changed(file.path);
  });

});
```

این پرونده رو می‌تونید تو [gist](https://gist.github.com/markgoodyear/8497946#file-gulpfile-js) هم ببینید. من این پیکربندی رو برای Grunt هم انجام دادم که می‌تونید برای مقایسه، [تو همون gist](https://gist.github.com/markgoodyear/8497946#file-gruntfile-js) ببینیدش.

اگر هر سوالی داشتید از فیلدهای نظردهی استفاده کنید.
