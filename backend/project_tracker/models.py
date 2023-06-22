from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_admin= models.BooleanField('Is admin', default=False)
    is_user = models.BooleanField('Is user', default=False)

class Project(models.Model):
    title=models.CharField(max_length=120)
    description=models.CharField(max_length=150,default="")
    start_date=models.DateField(max_length=120)
    end_date=models.DateField(max_length=120)
    completed=models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
