import os
from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4

# Create your models here.
def user_avatar_upload_path(instance, filename):
    upload_to = "profiles"
    ext = filename.split('.')[-1]

    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        filename = '{}.{}'.format(uuid4().hex, ext)
    
    return os.path.join(upload_to, filename)

def chat_image_upload_path(instance, filename):
    upload_to = "chats"
    ext = filename.split('.')[-1]

    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        filename = '{}.{}'.format(uuid4().hex, ext)
    
    return os.path.join(upload_to, filename)


class User(AbstractUser):
    avatar = models.ImageField(upload_to=user_avatar_upload_path, default="avatar.png", blank=True, null=True)
    username = models.CharField(max_length=255, unique=False, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    friends = models.ManyToManyField('User', blank=True)
    name = models.CharField(max_length=255)
    email  = models.EmailField(max_length=254, unique=True)
    status = models.CharField(default="Not Active", max_length=50)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
class Message(models.Model):
    sender = models.ForeignKey(User, related_name="sender", on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name="receiver", on_delete=models.CASCADE)
    message = models.TextField(max_length=1024)
    media = models.ManyToManyField('ChatMedia', blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_seen =  models.BooleanField(default=False)

    def __str__(self):
        return f"{self.message}"

class ChatMedia(models.Model):
    image = models.ImageField(upload_to=chat_image_upload_path, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.message.message}"

class Friend(models.Model):
    from_user = models.ForeignKey(User, related_name="from_user", on_delete=models.CASCADE)
    to_friend = models.ForeignKey(User, related_name="to_friend", on_delete=models.CASCADE)
    is_request = models.BooleanField(default=False, null=True, blank=True)
    
    def __str__(self):
        return "from {} to {}".format(self.from_user, self.to_friend)
    
