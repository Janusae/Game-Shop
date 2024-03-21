from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.urls import reverse


# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=50 , verbose_name="نام محصول")
    image = models.ImageField(upload_to='media/' , verbose_name="تصویر محصول")
    main_genre = models.CharField(max_length=50 , verbose_name="ژانر اصلی محصول")
    title = models.CharField(max_length=70, verbose_name="سربرگ محصول")
    price = models.IntegerField(verbose_name="قیمت محصول")
    short_description = models.TextField(verbose_name="توضیحات کوتاه")
    long_description = models.TextField(verbose_name="توضیحات بلند")
    review = models.TextField(verbose_name="مرور" , null=True , blank=True)
    uncount = models.BooleanField(default=False, null=True , blank=True , verbose_name="تخفیف محصول")
    last_price = models.IntegerField(verbose_name="قیمت قبل محصول", null=True , blank=True )
    next_price = models.IntegerField(verbose_name="قیمت بعد محصول" , null=True , blank=True )


    def get_absolute_url(self):
        return reverse('Product_Detail', kwargs={'pk': self.pk})
    def __str__(self):
        return f"{self.id}"
    class Meta:
        verbose_name = "محصول"
        verbose_name_plural = "محصولات"
class Comment(models.Model):
    name = models.CharField(max_length=50 , verbose_name="نام فرستنده" , null=True , blank=True)
    surname = models.CharField(max_length=50 , verbose_name="نام خانوادگی فرستنده", null=True , blank=True)
    email = models.EmailField(max_length=50 , verbose_name="ایمیل فرستنده", null=True , blank=True)
    subject = models.CharField(max_length=50 , verbose_name="موضوع پیام", null=True , blank=True)
    text = models.TextField(verbose_name="متن پیام")
    date = models.DateTimeField(auto_now_add=True , verbose_name="تاریخ ارسال")
    readed_by_admin = models.BooleanField(default=False, verbose_name="خوانده شده توسط ادمین")
    def __str__(self):
        return f"{self.name}"
    class Meta:
        verbose_name = "نظر"
        verbose_name_plural = "نظرات"
class Genre(models.Model):
    product = models.ManyToManyField(Product , verbose_name="ژانر محصول")
    genre = models.CharField(max_length=30  , verbose_name="ژانر محصول")
    def __str__(self):
        return f"{self.genre}"
    class Meta:
        verbose_name = "ژانر محصول"
        verbose_name_plural = "ژانر محصولات"
class Multi_tags(models.Model):
    product = models.ManyToManyField(Product , verbose_name="ژانر محصول")
    Tag = models.CharField(max_length=30  , verbose_name="ژانر محصول")
    def __str__(self):
        return f"{self.Tag}"
    class Meta:
        verbose_name = "تگ محصول"
        verbose_name_plural = "تگ محصولات"

class Subscriber(models.Model):
    email = models.EmailField(verbose_name="ایمیل")

    def __str__(self):
        return f"{self.id}"

    class Meta:
        verbose_name = "کاربر دنبال کننده"
        verbose_name_plural = "کاربر های  دنبال کننده"
