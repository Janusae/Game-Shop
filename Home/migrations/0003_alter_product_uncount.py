# Generated by Django 5.0.3 on 2024-03-18 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0002_product_last_price_product_next_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='uncount',
            field=models.BooleanField(blank=True, default=False, null=True, verbose_name='تخفیف محصول'),
        ),
    ]
