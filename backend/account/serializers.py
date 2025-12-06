from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):
  password = serializers.CharField(max_length=128,write_only=True,style={'input_type':'password'})
  


  
  class Meta:
    model = User
    fields = ['name','username','email','password']
    
  def validate(self, attrs):
    if User.objects.filter(email=attrs['email']).exists():
      raise serializers.ValidationError({'email':'Email is already in use'})
    if User.objects.filter(username=attrs['username']).exists():
      raise serializers.ValidationError({'username':'Username is already in use.'})
    return attrs
    

  
  def create(self, validated_data):
    user = User.objects.create_user(
        name=validated_data['name'],
        username=validated_data['username'],
        email=validated_data['email'],
        password=validated_data['password'], # Pass password here
    )
    return user
    
  def get_user_tokens(self,user):
    tokens = RefreshToken.for_user(user)
    return {
      'refresh':str(tokens),
      'access':str(tokens.access_token)
    }
    
 
   
    
    
  
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["role"] = user.role
        token["email"] = user.email
        token["username"] = user.username

        return token
