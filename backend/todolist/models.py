from django.db import models

# Create your models here.
class TodoTask(models.Model):
    task_title = models.CharField(max_length=255)
    task_completion = models.BooleanField(default=False)
    task_description = models.TextField(blank=True)
    task_created_at = models.DateTimeField(auto_now_add=True)
    task_updated_at = models.DateTimeField(auto_now=True)