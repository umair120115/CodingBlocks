from rest_framework import serializers
from .models import AppUser,Movies,Ticket

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AppUser
        fields=['id','name','email','phone','password']
    def create(self, validated_data):
        user=AppUser.objects.create_user(**validated_data)
        return user
    

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model=Movies
        fields='__all__'

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ticket
        fields='__all__'
