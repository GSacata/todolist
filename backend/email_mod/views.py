from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import EmailModObj
from .serializers import EmailModObjSerializer
# Create your views here.

@api_view(['GET', 'POST'])
def list_emails(request):
    if request.method == 'GET':
        print("method GET emails")

        emails_list = EmailModObj.objects.all()
        serializer = EmailModObjSerializer(emails_list, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        print("method POST emails")
        serializer = EmailModObjSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def detail_email(request, pk):
    # Pega apenas uma tarefa, permite editar e deletar

    try:
        email = EmailModObj.objects.get(pk=pk)
    except EmailModObj.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        print("method GET one email")
        serializer = EmailModObjSerializer(email)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        print("method PUT one email")
        serializer = EmailModObjSerializer(email, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method=='DELETE':
        print("method DELETE one email")
        email.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)