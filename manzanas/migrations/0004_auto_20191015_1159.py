# Generated by Django 2.2 on 2019-10-15 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manzanas', '0003_auto_20191015_1056'),
    ]

    operations = [
        migrations.CreateModel(
            name='MzsCallao',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idmz', models.CharField(blank=True, max_length=15, null=True)),
                ('geom', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'mzs_callao',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='MushroomSpot',
        ),
    ]
