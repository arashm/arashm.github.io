extends: post.liquid

title: گیرهای روبی
date: 15 Aug 2014 07:24:25 +0000
route: blog
---

خیلی از تازه‌کارهای Ruby on Rails شیفته‌ی کار کردن با این فریم‌ورک قدرتمند میشن و بدون اطلاع دقیق از زبان روبی شروع به ساخت برنامه‌هاشون باهاش میکنن. و البته که هیچ اشکالی تو این قضیه نیست. مگر اینکه این تازه‌کارها روی روش‌هاشون پافشاری کنن و تبدیل به یک توسعه‌دهنده ارشد بشن، بدون اینکه بازم از زبان روبی اطلاعی داشته باشن.

به‌هرحال، دیر یا زود، تازه‌کارها یا توسعه‌دهنده‌های باتجربه، هر دو به گیرهای روبی برخورد میکنن. پیچیدگی‌های خیلی کوچیکی که توی زبان مخفی هستن و ساعت‌ها دیباگ طاقت‌فرسا آخرش منتهی به «مشکل همین بود؟!!» میشه.

اینجا یک لیست از این گیرهای کوچیک روبی رو گذاشتم که توسعه دهنده‌های روبی باید ازشون مطلع باشن. برای هر مورد یک مثال و راهکار قرار دادم.

## `and/or` مثل `&&/||` نیستند

```ruby
surprise = true and false # => surprise is true
surprise = true && false  # => surprise is false
```
### عادت خوب

همیشه از `&&/||` استفاده کنید.

### جزئیات

- `and/or` نسبت به `&&/||` الویت کمتری دارن
- `and/or` نسبت به `=` الویت کمتری دارن ولی `&&/||` الویت بالاتری دارن
- `and` و `or` هر دو الویت یکسان دارن، درصورتی که `&&`  الویت بالاتری نسبت به `||` داره

میتونیم مثال اول رو با گذاشتن پرانتز روشن‌تر کنیم، که نشون خواهد داد چطور استفاده از `and` از `&&` متفاوت هست:

```ruby
(surprise = true) and false # => surprise is true
surprise = (true && false)  # => surprise is false
```
## `eql?` مثل `==` نیست (حتی مشابه `equal?` و `===` هم نیست)

```ruby
1 == 1.0   # => true
1.eql? 1.0 # => false
```

### عادت خوب

فقط از `==` استفاده کنید

### جزئیات

`==`، `===`، `eql?` و `equal?` رفتارهای متفاوتی دارن، که برای شرایط و استفاده متفاوت بکار میرن. برای مقایسه‌ی چیزها باید همیشه از `==` استفاده کنین، مگر اینکه واقعا احتیاج به موارد خاصی داشته باشین (مثل اینکه بخواین واقعا بین `1.0` و `1` تفاوت بزارین) یا اینکه هر کدوم از اینها رو بیاین بازنویسی کنین.

بله، `eql?` هوشمندتر از `==` عمل میکنه، ولی آیا این واقعا اون چیزی هست که بهش احتیاج دارین؟

## `super` مشابه `super()` نیست

```ruby
class Foo
  def show
    puts 'Foo#show'
  end
end

class Bar < Foo
  def show(text)
    super

    puts text
  end
end

Bar.new.show('test') # ArgumentError: wrong number of arguments (1 for 0)
```

### عادت خوب

این یکی، یکی از مواردی هست که برداشتن پرانتزها نه تنها سلیقه‌ای نیست، بلکه منطق برنامه رو عوض میکنه.

### جزئیات

- `super` (بدون پرانتز) متد والد رو با دقیقا همون متغیرهایی که به متد اصلی ارسال شدن صدا میزنه (بنابراین `super` در `Bar#show` تبدیل میشه به `super('test')` که اینجا باعث خطا میشه چون متد والد هیچ متغیری رو نمی‌پذیره)
- `super()` (با پرانتز) متد والد رو بدون هیچ متغیری صدا میزنه

## exceptionهای شما نباید `Exception` باشند

```ruby
class MyException < Exception
end

begin
  raise MyException
rescue
  puts 'Caught it!'
end

# MyException: MyException
#       from (irb):17
#       from /Users/karol/.rbenv/versions/2.1.0/bin/irb:11:in `<main>'
```

(در این کد عبارت `rescue` برای `MyException` هیچ‌وقت اجرا نمی‌شود و پیام `'Caught it!'` هم نمایش داده نخواهد شد)

### عادت خوب

- وقتی که کلاس exception خودتون رو تعریف می‌کنید، از `StandardError` یا هر کدوم از نوادگانش :))) (descendants) ارث‌بری کنید. هیچ‌وقت از `Exception` استفاده نکنید
- هیچ‌وقت از `rescue Exception` استفاده نکنید. اگر میخواید یک rescue کلی انجام بدید، عبارت rescue رو خالی بزارین (یا اینکه از `rescue => e` استفاده کنید)

### جزئیات

- وقتی عبارت `rescue` رو خالی میزارین، ینی اینکه exceptionهایی که از `StandardError` ارث‌بری کرده‌اند گرفته میشن و نه `Exception`
- اگر از `rescue Exception` استفاده کنین (که نباید بکنید)، شما خطاهایی رو catch می‌کنید که نمی‌تونید کاری براش بکنید (مثل خطای out of memory). همینطور سیگنال‌هایی مثل SIGTERM رو هم گیر میندازین که باعث میشه نتونید اسکریپت رو با CTRL-C متوقف کرد.

## `class Foo::Bar` مثل `module Foo; class Bar` نیست

```ruby
MY_SCOPE = 'Global'
  
module Foo
  MY_SCOPE = 'Foo Module'
  
  class Bar
    def scope1
      puts MY_SCOPE
    end
  end
end
  
class Foo::Bar
  def scope2
    puts MY_SCOPE
  end
end

Foo::Bar.new.scope1 # => "Foo Module"
Foo::Bar.new.scope2 # => "Global"
```

### عادت خوب

همیشه از نسخه طولانی‌تر و با جزئیات بیشتر استفاده کنید:

```ruby
module Foo
  class Bar
  end
end
```
### جزئیات

- کلیدواژه‌ی `module` (در کنار `class` و `def`) یک scope جدید تعریف میکنن. بنابراین، `module Foo` یک scope جدید `Foo` ایجاد میکنه که مقدار ثابت `MY_SCOPE` با مقدار `'Foo Module'` درش هست
- داخل این module ما یک کلاس `class Bar` تعریف کردیم، که یک scope جدید به نام `'Foo::Bar'` ایجاد میکنه، که دسترسی به scope والد (`'Foo'`) و تمام ثابت‌هایی که درش تعریف شدن داره
- وقتی شما Foo::Bar رو با میان‌بر `::` تعریف می‌کنین: `class Foo::Bar`، یک scope جدید ساخته میشه، که باز هم `Foo::Bar` نام داره، ولی اینجا دیگه والدی نداره، بنابراین دسترسی‌ای به scope با نام `Foo` نداره
- بنابراین در داخل `class Foo::Bar` ما فقط دسترسی به ثابت `MY_SCOPE` داریم که در ابتدای اسکریپت با مقدار `Global` تعریف شده

## اکثر متدهای `bang!` وقتی کاری نمی‌کنن مقدار `nil` بر می‌گردونن

```ruby
'foo'.upcase! # => "FOO"
'FOO'.upcase! # => nil
```

### عادت خوب

هیچ‌وقت به خروجی متدهای `bang!` پیش‌ساخته وابسته نباشین مثلا:

```ruby
@name.upcase! and render :show
```

کد بالا میتونه یکسری رفتارهای غیرمنتظره ازش سر بزنه (یا اینکه یک رفتار کاملا قابل انتظار وقتی که `@name` از قبل uppercase باشه). همینطور این یک مثال دیگه‌اس که نباید از `and/or` استفاده کنین. هیچ درختی قطع نخواهد شد اگر این دو خط رو اضافه کنید:

```ruby
@name.upcase!
render :show
```

## متدهای `attribute=(value)` همیشه مقدار ارسال شده رو به عنوان خروجی برمی‌گردونن

```ruby
class Foo
  def self.bar=(value)
    @foo = value
  
    return 'OK'
  end
end

Foo.bar = 3 # => 3
```

دقت کنید که این متد `bar=` مقدار `3` رو برمی‌گردونه با اینکه به مشخصا `return 'OK'` رو استفاده کردیم.

### عادت خوب

هیچ‌وقت بر اتفاقاتی که در این نوع متدها میافته وابسته نباشید. برای مثال در عبارت‌های شرطی مثل این:

```ruby
puts 'Assigned' if (Foo.bar = 3) == 'OK' # => nil
```

مشخصا این کار نخوهد کرد.

## `private` متدهای `self.method` رو private نخواهد کرد

```ruby
class Foo
  
  private
  def self.bar
    puts 'Not-so-private class method called'
  end

end

Foo.bar # => "Not-so-private class method called"
```

دقت کنید اگه private بود عبارت `Foo.bar` خطای `NoMethodError` بر می‌گردوند.

### عادت خوب

برای اینکه متدهای کلاس‌تون رو private کنید باید از `private_class_method :method_name` استفاده کنین یا اینکه متدهای private رو درون `class << self` بزارین:

```ruby
class Foo

  class << self
    private    
    def bar
      puts 'Class method called'
    end    
  end

  def self.baz
    puts 'Another class method called'
  end
  private_class_method :baz

end

Foo.bar # => NoMethodError: private method `bar' called for Foo:Class
Foo.baz # => NoMethodError: private method `baz' called for Foo:Class
```

## پایان

فهرست بالا در ابتدا شاید چیز خاصی به نظر نیاد، ولی بعدا میاد خرتون رو میگیره. پس بهتره که در موردشون اطلاع داشته باشین. اطلاع داشتن در مورد اینها، ساعت‌ها وقت شما رو برای دیباگ کردن کدها زنده می‌کنه و از سردردهای آتی می‌کاهد :D

([منبع](http://blog.elpassion.com/ruby-gotchas/))
