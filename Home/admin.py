from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.Product)
admin.site.register(models.Genre)
class ChangeAdmin(admin.ModelAdmin):
    list_filter = ["readed_by_admin"]
admin.site.register(models.Comment , ChangeAdmin)
admin.site.register(models.Multi_tags)
admin.site.register(models.Subscriber)