extends: post.liquid

title: میانبرهای کمکی تاریخچه در Shell
date: 13 Sep 2014 13:11:35 +0000
route: blog
---

یکسری متغیرها و میانبرها در shell لینوکس هست که کار کردن باهاش رو خیلی ساده‌تر و باحال‌تر میکنه. این میانبرها همه با `!` شروع میشن. یکسری از پرکاربردترین‌هاش رو اینجا میزارم.

## متغیرهای کمکی

فرض کنید دستور قبلی که در ترمینال زدیم دستور `du -h directory/example.rb` بوده. با توجه به این دستور، یک مثال نوشتم و خروجی هر کدوم از متغیرهای کمکی در جدول زیر نمایش داده شده:

test | test
--|--
123 | 123

متغیر | توضیحات | نمونه | خروجی
--|  | -- | :--
`!!` | فراخوانی دستور قبل | `sudo !!` | `sudo du -h directory/example.rb`
`!*` | هر چیزی غیر از نام دستور قبل | - | `-h directory/example.rb`
`!:n` | جدا کردن قسمت n ام | `!:1` | `-h`
`!$` یا `$_` | آخرین قسمت دستور قبل، معمولا path | `!$` | `directory/example.rb`
`!$:h` | قسمت اول path دستور قبل | `!$:h` | `directory`
`!$:t` | قسمت آخر path دستور  قبل | `!$:t` | `example.rb`
`!$:r` | path بدون پسوند پرونده | `!$:r` | `directory/example`
`!$:t:r` | قسمت آخر path بدون پسوند پرونده | `!$:t:r` | `example`
`!$:t:e` | نمایش فقط پسوند | `!$:t:e` | `rb`

نکته: یک توضیح در مورد دستورهایی که با `!$` شروع میشن: می‌تونید به جای `!$` از `!:n` استفاده کنید. مثلا در دستور نمونه ما path در قسمت دوم است. پس تمامی موارد بالا با `!:2` هم کار میکنه. همیشه ممکنه path آخرین قسمت دستور نباشه! :)

### کجا استفاده میشن؟

معمولا وقتی در دستور بعدی میخواهید به دستور قبلی ارجاع کنین و نمی‌خواید همه چیز رو دوباره تایپ کنید. مثلا اگر یادتون میره جلوی دستور بزنید sudo می‌تونید تو دستور بعد به جای تایپ کردن همه چیز فقط بنویسین `sudo !!`. یا اینکه در دستور بعد میخواین pathای که در دستور قبلی دادید رو دوباره استفاده کنید، یک راه‌اش اینه که کپی کنید و راه دیگه اینه که مثلا `vim $_`. راحت‌تر نیست؟

### تفاوت Bash و Zsh

تنها تفاوت اینه که Bash بلافاصله دستور رو اجرا میکنه ولی Zsh دستور رو فقط نمایش میده. برای اینکه Bash هم خودش اجرا نکنه از `:p` استفاده کنید تا فقط نمایش داده بشه. مثلا: `sudo !!:p`. در کل اگه Bash استفاده می‌کنید برید زودتر Zsh استفاده کنید :D

## اصلاح دستور قبل

فرض کنید در یک دستور غلط املایی دارین. مثلا `du -h examlpe.rb`. برای اصلاح‌اش کافیه دستور زیر رو بزنید:

```shell
^examlpe^example
```

shell دستور اصلاح شده رو نمایش میده.