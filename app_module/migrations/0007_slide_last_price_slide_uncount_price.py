# Generated by Django 5.0.3 on 2024-03-20 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_module', '0006_slide'),
    ]

    operations = [
        migrations.AddField(
            model_name='slide',
            name='last_price',
            field=models.IntegerField(blank=True, null=True, verbose_name='قیمت محصول'),
        ),
        migrations.AddField(
            model_name='slide',
            name='uncount_price',
            field=models.IntegerField(blank=True, null=True, verbose_name='تخفیف محصول'),
        ),
    ]
