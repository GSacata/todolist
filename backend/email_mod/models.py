from django.db import models

# Create your models here.
class EmailModObj(models.Model):
    email_address = models.CharField(max_length=80, blank=True)
    email_password = models.CharField(max_length=19, blank=True)
    email_subject = models.CharField(max_length=255, blank=True) # Título da tarefa