from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.Serializer):
    name=serializers.CharField(max_length=50)
    email=serializers.EmailField()
    password=serializers.CharField(max_length=30)
    def create(self, validated_data):
        return User.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.name=validated_data.get('name',instance.name)
        instance.roll=validated_data.get('email',instance.email)
        instance.city=validated_data.get('password',instance.password)
        instance.save()
        return instance