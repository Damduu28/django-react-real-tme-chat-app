from typing import Any, Dict
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import Token
from core.models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from datetime import datetime


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        user.status = "Active now"  # Set is_active to False, for example
        user.last_login = timezone.now()  # Set is_active to False, for example
        user.save()
        return data
    
    @classmethod
    def get_token(cls, user):
        token = RefreshToken.for_user(user)
        token['name'] = user.name
        token['username'] = user.username
        return token
    
class FriendSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'username', 'email', 'avatar', 'last_login', 'status')

class UserSerializer(ModelSerializer):
    friends = FriendSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'name', 'username', 'email', 'avatar', 'status', 'last_login', 'location', 'friends')

class UserFriendSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'username', 'email', 'avatar', 'status', 'date_joined', 'location', )

class UserSignUpSerializers(ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'username', 'email', 'is_active', 'password')

    def create(self, validated_data):
        print("Data: ", validated_data)

        user = User.objects.create(
            name=validated_data.get('name'),
            username=validated_data.get('username'),
            email=validated_data.get('email'),
        )

        user.set_password(validated_data.get('password'))
        user.save()
        return user
    
class MessageSerializer(ModelSerializer):
    sender = FriendSerializer(many=False, read_only=True).data
    receiver = FriendSerializer(many=False, read_only=True).data
    class Meta:
        model = Message
        fields = ('id', 'sender', 'receiver', 'message', 'timestamp', 'is_seen')
            