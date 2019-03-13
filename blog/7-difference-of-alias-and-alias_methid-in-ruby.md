---
layout: post.liquid
title: تفاوت alias و alias_method در روبی
published_date: 2014-05-15 07:25:41 +0000
---

تو روبی برای ایجاد نام مستعار برای متدها میشه از `alias` یا `alias_method` استفاده کرد. در نگاه اول ممکنه به نظر بیاد که این دو تا مثل هم هستن ولی در حقیقت یک تفاوت خیلی کوچک با هم دارن.

## کد برای alias:

```ruby
class Test
  def name
    puts 'Arash'
  end

  alias :sirname :name
end

Test.new.name # => Arash
Test.new.sirname # => Arash
```

## کد برای alias_method:

```ruby
class Test
  def name
    puts 'Arash'
  end

  alias_method :sirname, :name
end

Test.new.name # => Arash
Test.new.sirname # => Arash
```

تا اینجا که چیز خیلی خاصی دیده نمیشه. فقط اینکه تو `alias` از کاما استفاده نمی‌کنیم. این رفتار عادی و مورد انتظار از `alias` و `alias_method` است. در این موارد `name` و `sirname` هر دو خروجی یکسان دارن. اما اگه یک کلاس زیرمجموعه از `Test` درست کنیم چی؟

```ruby
class Test
  def name
    puts 'Arash'
  end

  def self.do_rename
    alias :sirname :name
  end
end

class Example < Test
  def name
    puts 'Ernie'
  end
  do_rename
end

Example.new.name # => Ernie
Example.new.sirname # => Arash
```
اینجا `sirname` به کلاس والد اشاره می‌کنه. `alisa` زمانی که کد parse میشه مقداردهی میشه. موقع اجرای `Test` متد `sirname` با مقدار `name` پر میشه و این برای تمام کلاس‌های گرفته شده از `Test` هم درسته.

در طرف مقابل `alias_method` در همون حوزه‌ی `self` مقداردهی میشه:

```ruby
class Test
  def name
    puts 'Arash'
  end
  
  def self.do_rename
    alias_method :sirname, :name
  end
end

class Example < Test
  def name
    puts 'Ernie'
  end

  do_rename
end

Example.new.name # => Ernie
Example.new.sirname # => Ernie
```

توضیح خاص دیگه فکر نکنم بخواد. کاملا روشن‌ه :)
