from rest_framework import views
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render

from .models import TodoTask
from .serializers import TodoTaskSerializer
# from rest_framework import generics

# Create your views here.

# Class-based viewsets
# Descartadas, isso atrapalhou a fixação de conceitos importantes. Refazendo em api_view...

# class TodoTaskListCreate(generics.ListCreateAPIView):
#     queryset = TodoTask.objects.all()
#     serializer_class = TodoTaskSerializer

# class TodoTaskDetailUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
#     queryset = TodoTask.objects.all()
#     serializer_class = TodoTaskSerializer


# Será usada para alguns testes prévios de envio de email
@api_view()
def hello_world(request):
    print("request: ", request)
    print("response: ", Response)
    return Response({"message": "Hello World!", "uma chave": "qualquer"})


@api_view(['GET', 'POST'])
def list_and_add_tasks(request):
    if request.method == 'GET':
        print("method GET")
        tasklist = TodoTask.objects.all()
        serializer = TodoTaskSerializer(tasklist, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        print("method POST")
        serializer = TodoTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)