# -*- coding: utf-8 -*-
# Generated by Django 1.11.22 on 2019-07-18 18:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accommodation',
            name='kind',
            field=models.IntegerField(choices=[(1, 'Hotel'), (2, 'Campsite'), (3, 'Field'), (4, 'Bed and Breakfast'), (5, 'Hotel Garni'), (6, 'Pension'), (7, 'Holiday Cottage'), (8, 'Youth Hostel'), (9, 'Bunkhouse')]),
        ),
        migrations.AlterField(
            model_name='activity',
            name='activity_type',
            field=models.IntegerField(choices=[(1, 'Workshop'), (2, 'Excursion'), (3, 'Lecture'), (4, 'Community Activity'), (5, 'Hike'), (6, 'Run')], default=1),
        ),
        migrations.AlterField(
            model_name='activity',
            name='attachment',
            field=models.FileField(null=True, upload_to='attachments/'),
        ),
        migrations.AlterField(
            model_name='activity',
            name='attachment_type',
            field=models.IntegerField(choices=[(1, 'GPS Track'), (2, 'Image'), (3, 'Data')], default=3),
        ),
        migrations.AlterField(
            model_name='activity',
            name='duration',
            field=models.IntegerField(default=60, help_text='minutes'),
        ),
        migrations.AlterField(
            model_name='activity',
            name='preferred_days',
            field=models.IntegerField(blank=True, choices=[(1, 'Sunday'), (2, 'Monday'), (4, 'Tuesday'), (8, 'Wednesday'), (16, 'Thursday'), (32, 'Friday'), (64, 'Saturday')], null=True),
        ),
        migrations.AlterField(
            model_name='lbw',
            name='end_date',
            field=models.DateTimeField(help_text='Format: YYYY-MMM-DD HH:MM:SS'),
        ),
        migrations.AlterField(
            model_name='lbw',
            name='size',
            field=models.IntegerField(blank=True, choices=[(1, 'Full fat'), (2, 'Mini'), (3, 'Micro'), (4, 'One man alone in a bar'), (5, 'Kriek')], default=1, null=True),
        ),
        migrations.AlterField(
            model_name='lbw',
            name='start_date',
            field=models.DateTimeField(help_text='Format: YYYY-MMM-DD HH:MM:SS'),
        ),
        migrations.AlterField(
            model_name='tshirtorders',
            name='size',
            field=models.CharField(choices=[('M - S', 'Men - Small'), ('M - M', 'Men - Medium'), ('M - L', 'Men - Large'), ('M - XL', 'Men - Large')], max_length=51),
        ),
        migrations.AlterField(
            model_name='userregistration',
            name='arrival_date',
            field=models.DateTimeField(help_text='Format: YYYY-MMM-DD HH:MM:SS'),
        ),
        migrations.AlterField(
            model_name='userregistration',
            name='departure_date',
            field=models.DateTimeField(help_text='Format: YYYY-MMM-DD HH:MM:SS'),
        ),
    ]
