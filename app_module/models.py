from django.db import models

# Create your models here.
class Footer_information(models.Model):
    copyright = models.CharField(max_length=500 , verbose_name="متن کپی رایت")
    main_setting = models.BooleanField(default=False , verbose_name="تنظیمات اصلی سایت")
    def __str__(self):
        return f"{self.copyright}"
    class Meta:
        verbose_name = "اطلاعات footer"
        verbose_name_plural = "اطلاعات footer"



class Header_information(models.Model):
    Product_link = models.URLField(max_length=500 , verbose_name="لینک صفحه محصولات" , null=True , blank=True)
    User_Panel_link = models.URLField(max_length=500 , verbose_name="لینک صفحه پنل کاربر", null=True , blank=True)
    Logout_link = models.URLField(max_length=500 , verbose_name="لینک صفحه خرج کاربر", null=True , blank=True)
    Register_link = models.URLField(max_length=500 , verbose_name="لینک صفحه ثبت نام", null=True , blank=True)
    Login_link = models.URLField(max_length=500 , verbose_name="لینک صفحه ورود کاربر", null=True , blank=True)
    Panel_Admin_link = models.URLField(max_length=500 , verbose_name="لینک صفحه پنل ادمین", null=True , blank=True)
    Contact_Us_link = models.URLField(max_length=500 , verbose_name="لینک صفحه ارتباط با ما" , null=True , blank=True)
    About_Us_link = models.URLField(max_length=500 , verbose_name="لینک صفحه درباره ما", null=True , blank=True)
    Home_link = models.URLField(max_length=500 , verbose_name="لینک صفحه اصلی", null=True , blank=True)
    main_setting = models.BooleanField(default=False , verbose_name="تنظیمات اصلی سایت", null=True , blank=True)
    logo = models.ImageField(upload_to="media/setting/" , verbose_name="لوگوی سایت" , null=True , blank=True)
    def __str__(self):
        return f"{self.Home_link}"
    class Meta:
        verbose_name = "اطلاعات Header"
        verbose_name_plural = "اطلاعات Header"

class Slide(models.Model):
    small_text = models.CharField(max_length=100 , verbose_name="متن کوچکتر")
    big_text = models.CharField(max_length=100 , verbose_name="متن بزرگتر")
    text = models.TextField(max_length=500 , verbose_name="متن")
    image = models.ImageField(upload_to="media/setting/" , verbose_name="تصویر بنر")
    uncount = models.BooleanField(default=False , verbose_name="تخفیف دارد / ندارد")
    last_price = models.IntegerField(verbose_name="قیمت محصول" , null=True , blank=True)
    uncount_price = models.IntegerField(verbose_name="تخفیف محصول", null=True , blank=True)

    def __str__(self):
        return f"{self.id}"
    class Meta:
        verbose_name = "اطلاعات بنر"
        verbose_name_plural = "اطلاعات بنر"

class Website_Information(models.Model):
    website_name = models.CharField(max_length=50 , verbose_name="نام سایت")
    website_information = models.TextField(verbose_name="در مورد سایت")
    address = models.TextField(verbose_name="آدرس")
    phone = models.IntegerField(verbose_name="شماره تلفن" , null=True , blank=True)
    email = models.EmailField(verbose_name="آدرس ایمیل" , null=True , blank=True)

    def __str__(self):
        return f"{self.id}"
    class Meta:
        verbose_name = "اطلاعات سایت"
        verbose_name_plural = "اطلاعات سایت"
