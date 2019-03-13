---
layout: post.liquid
title: Rails 4.1 ActiveRecord enums
published_date: 2014-05-15 07:25:19 +0000
---

نسخه ۴.۱ ریلز به تازگی منتشر شده و امکانات جالب جدیدی داره. یکی از این امکانات ActiveRecord Enums هست، یک امکان خوب که ذخیره حالت‌های مختلف یک رکورد در مدل رو آسون میکنه.

مثلا فرض کنید که در برنامه‌تون یک مدل `User` دارین و هر کدوم از این کاربرها می‌تونین یک وضعیت به عنوان‌های `registered` و `active` یا `blocked` داشته باشن.

تو نسخه‌های قبلی اگر میخواستین این کار رو بکنید، احتمالا یک فیلد متنی یا عددی به دیتابیس اضافه می‌کردین و بعد هم چندتا `scope` توی مدل میذاشتین تا از جدول اطلاعات رو بگیرید. حالا همه چیز ساده‌تر شده. فقط لازمه که یک `migration` بنویسید و فقط فیلد لازم رو به جدول اضافه کنید:

```ruby
class AddStatus < ActiveRecord::Migration
  def change
    add_column :users, :state, :integer
  end
end
```

و بعد هم ماکرو `enum` رو به کلاس `User` اضافه کنید:

```ruby
class User
  enum state: [:registered, :active, :blocked]
end
```

به صورت پیش‌فرض وضعیت کاربر `nil` خواهد بود. ما می‌تونیم با اسم هر وضعیت یک کوئری بگیریم:

```ruby
user = User.new
user.state
 # => nil

user.registered?
 # => false

user.state = :registered
user.registered?
 # => true
```

می‌تونیم مستقیما وضعیت کاربر رو بروزرسانی و ذخیره کنیم:

```ruby
user.registered!
user.persisted?
 # => true
user.registered?
 # => true
```

همینطور به طور خودکار یک `scope` هم برای هر وضعیت داریم:

```ruby
User.active
 # => #<ActiveRecord::Relation []>
User.registered
 # => #<ActiveRecord::Relation [#<User id: 7, status: 0...]>
```

حتی می‌تونیم به شکل مستقیم یک کاربر با وضعیتی که میخوایم بسازیم:

```ruby
User.registered.create
 # => #<User id: 6, status: 1, ...>
```

ActiveRecord برای ذخیره وضعیت‌ها توی فیلد دیتابیس از عدد استفاده میکنه. اگر لازم باشه که یک وضعیت پیش‌فرض برای کاربر داشته باشیم (ینی کاربری که ساخته میشه مثلا وضعیت `active` داشته باشه و نه `nil`) میتونیم توی migration از کلید `default` استفاده کنیم:

```ruby
class ChangeStatus < ActiveRecord::Migration
  def change
    change_column :users, :status, :integer, default: 1
  end
end
```

از الان به بعد تمام کاربرهای جدیدی که ساخته میشن وضعیت پیش‌فرض active رو خواهند داشت:

```ruby
user = User.new
user.state
 # => "active"
```

توجه داشته باشین که برای اسم وضعیت‌ها از اسم‌های ستون‌های موجود در پایگاه داده یا متدهایی که قبلا استفاده کردین و یا کلیدهایی که مختص ریلز هست، استفاده نکنید. اگر اشتباها اینکار رو بکنید، ریلز خطا میده:

```ruby
class User
  enum state: [:logger]
end
 # => ArgumentError: You tried to define an enum named "state" on the model "User",
 # but this will generate a class method "logger", 
 # which is already defined by Active Record.
```
