from rest_framework import serializers
from .models import TodoTask

class TodoTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoTask
        fields = ['id', 'task_title', 'task_completion', 'task_description', 'task_created_at', 'task_updated_at']