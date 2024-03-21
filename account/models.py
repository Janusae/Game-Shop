from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    email_active = models.CharField(max_length=94 , verbose_name="فعال سازی ایمیل")
    avatar = models.CharField(max_length=50 , verbose_name="تصویر کاربر")