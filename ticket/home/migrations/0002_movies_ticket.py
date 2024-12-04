# Generated by Django 5.1.3 on 2024-12-04 16:05

import django.db.models.deletion
import multiselectfield.db.fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(choices=[('Umrao Mall, Mahanagar, Lucknow', 'Umrao Mall, Mahanagar, Lucknow'), ('Lulu Mall, Lucknow', 'Lulu Mall, Lucknow'), ('Saharaganj Mall, Lucknow', 'Saharaganj Mall, Lucknow')], max_length=100)),
                ('language', models.CharField(choices=[('Hindi', 'Hindi'), ('English', 'English'), ('Telugu', 'Telugu'), ('Marathi', 'Marathi'), ('Bengali', 'Benagli')], max_length=10)),
                ('genre', multiselectfield.db.fields.MultiSelectField(choices=[('Action', 'Action'), ('Adventure', 'Adventure'), ('Comedy', 'Comedy'), ('Drama', 'Drama'), ('Documentary', 'Documentary'), ('Crime', 'Crime'), ('Animation', 'Animation'), ('Romance', 'Romance'), ('scifi', 'Scifi')], max_length=71)),
                ('industry_type', models.CharField(choices=[('Hollywood', 'Hollywood'), ('Bollywood', 'Bollywood'), ('Telugu Cinema', 'Tollywood'), ('Malayalam Cinema', 'Mollywood'), ('Kannad Cinema', 'Sandalwood')], max_length=50)),
                ('movie', models.CharField(max_length=50)),
                ('producer', models.CharField(max_length=50)),
                ('director', models.CharField(max_length=50)),
                ('actors', models.TextField()),
                ('actresses', models.TextField()),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('room_no', models.CharField(choices=[('First Room', 'One'), ('Second Room', 'Two'), ('Third Room', 'Three'), ('Fourth Room', 'Fourth')], max_length=30)),
                ('film_poster', models.ImageField(upload_to='posters/')),
                ('prices', models.IntegerField()),
                ('total_seats', models.IntegerField(default=50)),
                ('booked_seats', models.JSONField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seats', models.JSONField(default=dict)),
                ('payment', models.BooleanField(default=False)),
                ('booking_date', models.DateField(auto_now_add=True)),
                ('total', models.IntegerField()),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='selected_movie', to='home.movies')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='person_name', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
