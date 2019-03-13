---
layout: post.liquid
title: گرفتن زیرشاخه‌های خاص از یک مخزن Git
published_date: 2014-05-15 07:26:47 +0000
---

{m:info}(نوشته از [Jason Karns](http://jasonkarns.com/blog/author/jasonkarns/) در [Code Nomad](http://jasonkarns.com/blog/subdirectory-checkouts-with-git-sparse-checkout/))

ممکنه یک زمانی بخواهید از یک مخزن Git فقط یک قسمت/پوشه خاص رو دریافت کنین و آپدیت نگه‌اش دارین. برای اینکار باید از امکان spare-checkout گیت استفاده کنید.

## مخزن جدید

برای اینکه بشه از این امکان استفاده کرد، باید تو تنظیمات مخزن گیت `core.sparecheckout` مقدار `true` تظیم بشه. برای اینکار هم لازمه‌اش اینه که مخزن از قبل وجود داشته باشه. پس به جای اینکه `git clone` کرد، باید `git init` انجام داد.

مخزن جدید رو بسازید:

```shell
mkdir <repo> && cd <repo>
git init
git remote add –f <name> <url>
```

امکان spare-checkout رو فعال کنید:

```shell
git config core.sparsecheckout true
```

زیر شاخه‌هایی که میخواین رو در `.git/info/spare-checkout` اضافه کنید:

```shell
echo some/dir/ >> .git/info/sparse-checkout
echo another/sub/tree >> .git/info/sparse-checkout
```

حالا مخزن رو از سرور `pull` کنید:

```shell
git pull <remote> <branch>
```

## مخزن موجود

اگر از قبل یک مخزن دارید و میخواید spare-checkout استفاده کنید، مثل مورد بالا spare-checkout رو فعال کنین و بعد هم `git read-tree` رو انجام بدین:

```shell
git config core.sparsecheckout true
```

اضافه کردن شاخه‌های مورد نیاز به `.git/info/spare-checkout` :

```shell
echo some/dir/ >> .git/info/sparse-checkout
echo another/sub/tree >> .git/info/sparse-checkout
```

مخزن رو آپدیت کنین:

```shell
git read-tree -mu HEAD
```

## تغییر زیرشاخه‌های انتخاب شده

اگر بعداً تصمیم گرفتین که زیرشاخه‌هایی که انتخاب کردین رو تغییر بدین، خیلی راحت پرونده spare-checkout رو تغییر بدین و بعد هم `git read-tree` رو دوباره اجرا کنین.

[مستندات مربوط به sub-tree/spare-checkout](http://git-scm.com/docs/git-read-tree) رو بخونید. پرونده spare-tree از الگوها هم پشتیبانی می‌کنه، دقیقا مثل gitignore. از لیست سیاه هم پشتیبانی میشه - میتونید انتخاب کنید که چه شاخه‌ها یا پرونده‌های `checkout` نشن.
