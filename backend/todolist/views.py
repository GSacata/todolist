from django.shortcuts import render

from .models import TodoTask
from .serializers import TodoTaskSerializer
from rest_framework import generics

# Create your views here.

# Class-based viewsets
class TodoTaskListCreate(generics.ListCreateAPIView):
    queryset = TodoTask.objects.all()
    serializer_class = TodoTaskSerializer

class TodoTaskDetailUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = TodoTask.objects.all()
    serializer_class = TodoTaskSerializer