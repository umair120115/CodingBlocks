from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from multiselectfield import MultiSelectField

# Create your models here.
class AppUserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not password:
            raise ValueError("password is required")
        extra_fields.setdefault('is_active',True)
        user=self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email,password,**extra_fields)
class AppUser(AbstractBaseUser):
    name=models.CharField(max_length=50)
    email=models.EmailField(unique=True)
    phone=models.IntegerField(unique=True)
    password=models.CharField(max_length=50)
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name','phone','password']

    objects = AppUserManager()

    def __str__(self):
        return self.Name

    def has_module_perms(self, app_label):
        return True

    def has_perm(self, perm, obj=None):
        return True
    



class Language(models.Choices):
    Hindi='Hindi'
    English='English'
    Telugu='Telugu'
    Marathi='Marathi'
    Benagli='Bengali'
class Genre(models.Choices):
    Action='Action'
    Adventure='Adventure'
    Comedy='Comedy'
    Drama='Drama'
    Documentary='Documentary'
    Crime='Crime'
    Animation='Animation'
    Romance='Romance'
    Scifi='scifi'

class Industry(models.Choices):
    Hollywood='Hollywood'
    Bollywood='Bollywood'
    Tollywood='Telugu Cinema'
    Mollywood='Malayalam Cinema'
    Sandalwood='Kannad Cinema'
class Room(models.Choices):
    One='First Room'
    Two='Second Room'
    Three='Third Room'
    Fourth='Fourth Room'
class Location(models.TextChoices):
    FirstLocation='Umrao Mall, Mahanagar, Lucknow', 'Umrao Mall, Mahanagar, Lucknow'
    SecondLocation='Lulu Mall, Lucknow', 'Lulu Mall, Lucknow'
    ThirdLocation='Saharaganj Mall, Lucknow', 'Saharaganj Mall, Lucknow'


class Movies(models.Model):
    location=models.CharField(max_length=100,choices=Location.choices)
    language=models.CharField(max_length=10,choices=Language.choices)
    genre=MultiSelectField(choices=Genre.choices)
    industry_type=models.CharField(max_length=50,choices=Industry.choices)
    movie=models.CharField(max_length=50)
    producer=models.CharField(max_length=50)
    director=models.CharField(max_length=50)
    actors=models.TextField()
    actresses=models.TextField()
    date=models.DateField()
    time=models.TimeField()
    room_no=models.CharField(max_length=30,choices=Room.choices)
    film_poster=models.ImageField(upload_to='posters/')
    prices=models.IntegerField()
    total_seats = models.IntegerField(default=50)
    booked_seats = models.JSONField(blank=True,null=True)
    
    def __str__(self):
        return self.movie
class Ticket(models.Model):
    movie=models.ForeignKey(Movies, on_delete=models.CASCADE,related_name='selected_movie')
    person=models.ForeignKey(AppUser,on_delete=models.CASCADE,related_name='person_name')
    seats=models.JSONField(default=dict)
    payment=models.BooleanField(default=False)
    booking_date=models.DateField(auto_now_add=True)
    total=models.IntegerField()

    def __str__(self):
        return self.person.name