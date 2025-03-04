import uuid
from django.db import models

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=255, unique=True, blank=True)
    first_name = models.CharField(max_length=255, unique=True, blank=True)
    last_name = models.CharField(max_length=255, unique=True, blank=True)
    email = models.EmailField(max_length=255, unique=True, blank=True)
    password = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = str(self.id)
        super(User, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class AddedUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='added_users')
    username = models.CharField(max_length=255, unique=True, blank=True)
    first_name = models.CharField(max_length=255, unique=True, blank=True)
    last_name = models.CharField(max_length=255, unique=True, blank=True)
    email = models.EmailField(max_length=255, unique=True, blank=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


