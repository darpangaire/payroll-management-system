from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings


# Create your models here.

class MyAccountManager(BaseUserManager):
    def create_user(self,name, username, email, password=None,role="employee"):
        if not email:
            raise ValueError('User must have an email address')

        if not username:
            raise ValueError('User must have an username')
        
        

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            name = name,
            role = role

        )

        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

    def create_superuser(self, name, email, username, password):
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password = password,
            name=name,
            role="admin" # superuser is admin by default
 
        )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superadmin = True
        user.save(using=self._db)
        return user



class Account(AbstractBaseUser):
    ROLE_CHOICES = (
        ("admin","Admin"),
        ("employee","Employee"),
    )
    
    
    name      = models.CharField(max_length=100,default="")
    
    username        = models.CharField(max_length=50, unique=True)
    email           = models.EmailField(max_length=100, unique=True)
    
    # Role field
    role = models.CharField(max_length=20, choices=ROLE_CHOICES,default="employee")

    # required
    date_joined     = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True, null=True, blank=True)

    is_admin        = models.BooleanField(default=False)
    is_staff        = models.BooleanField(default=False)
    is_active        = models.BooleanField(default=False)
    is_superadmin        = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name']

    objects = MyAccountManager()

    def full_name(self):
        return self.name 

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True
    



    

    