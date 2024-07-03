# Generated by Django 5.0.4 on 2024-04-22 11:38

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, default='avatar.png', null=True, upload_to=core.models.user_avatar_upload_path),
        ),
    ]
