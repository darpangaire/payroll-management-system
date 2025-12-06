from rest_framework import status,permissions,generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegistrationSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer 
User = get_user_model()

class RegistrationView(APIView):
  permission_classes = [permissions.AllowAny]
  
  def post(self,request,*args,**kwargs):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
      user = serializer.save()
      tokens = serializer.get_user_tokens(user)
      response_data = {
        "message":"user registered successfully",
        "user":{
          "name":user.name,
          "username":user.username,
          "email":user.email
        },
        "tokens":tokens
      }
      return Response(response_data,status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
  
      
      
