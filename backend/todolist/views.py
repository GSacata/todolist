# from rest_framework import views
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


@api_view(['GET', 'POST'])
def list_and_add_tasks(request):
    # Pega todas as tarefas, e permite criar novas

    if request.method == 'GET':
        print("method GET")

        def hello_world():
            objeto_de_teste = {"message": "Hello World!", "uma chave": "qualquer"}
            print(objeto_de_teste)
            outro_teste = 1 + 1
            print(outro_teste)
        hello_world()

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


@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    # Pega apenas uma tarefa, permite editar e deletar

    try:
        task = TodoTask.objects.get(pk=pk)
    except TodoTask.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        print("method GET one task")
        serializer = TodoTaskSerializer(task)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        print("method PUT one task")
        serializer = TodoTaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method=='DELETE':
        print("method DELETE one task")
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        