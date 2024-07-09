from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action

from .models import EmailModObj
from .serializers import EmailModObjSerializer

import smtplib
import email.message
import json
# Create your views here.

# @api_view(['GET', 'POST'])
# def list_and_send_reminder_email(request):
#     if request.method == 'GET':
#         print("method GET emails")

#         emails_list = EmailModObj.objects.all()
#         serializer = EmailModObjSerializer(emails_list, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         print("method POST emails")
#         serializer = EmailModObjSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()

#             print("preparing reminder email")

#             def send_reminder_email():
#                 print("sent reminder email")
#             send_reminder_email()

#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PUT', 'DELETE'])
# def detail_email(request, pk):
#     # Pega apenas uma tarefa, permite editar e deletar

#     try:
#         emailobj = EmailModObj.objects.get(pk=pk)
#     except EmailModObj.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         print("method GET one email")
#         serializer = EmailModObjSerializer(emailobj)
#         return Response(serializer.data)
    
#     if request.method == 'PUT':
#         print("method PUT one email")
#         serializer = EmailModObjSerializer(emailobj, data=request.data)
#         if serializer.is_valid():
#             serializer.save()

#             def sent_test_email():
#                 print(f"Preparing test email")
#                 content = JSONRenderer().render(serializer.data)
#                 json_content = json.loads(content)

#                 corpo_email = """
#                 <p>Email de teste</p>
#                 <p>Enviado pelo seu todolist. DEV!!</p>
#                 """

#                 # corpo_email = f"\n{serializer.data.keys},\n{serializer.data.values}"

#                 msg = email.message.Message()
#                 msg['Subject'] = "Test email from GSacata's Todolist"
#                 msg['From'] = json_content["email_address"]
#                 msg['To'] = json_content["email_address"]
#                 password = json_content["email_password"]  # NÃO É A SENHA DO SEU EMAIL.
#                 msg.add_header('Content-Type', 'text/html')
#                 msg.set_payload(corpo_email)

#                 s = smtplib.SMTP('smtp.gmail.com: 587')
#                 s.starttls()
#                 # Login Credentials for sending the mail
#                 s.login(msg['From'], password)
#                 s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))

#                 print(f'Email sent to {json_content["email_address"]}')
#             sent_test_email()

#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method=='DELETE':
#         print("method DELETE one email")
#         emailobj.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    

class ListEmailModObj(viewsets.ModelViewSet):
    queryset = EmailModObj.objects.all()
    serializer_class = EmailModObjSerializer

    def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        email = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(email)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print('success create action')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        emailobj = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(emailobj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # print('success update action')

            # print(f"Preparing test email")
            # # serializer = self.serializer_class(data=request.data)
            # content = JSONRenderer().render(serializer.data)
            # json_content = json.loads(content)

            # corpo_email = """
            # <p>Email de teste</p>
            # <p>Enviado pelo seu todolist. DEV!!</p>
            # """

            # # corpo_email = f"\n{serializer.data.keys},\n{serializer.data.values}"

            # msg = email.message.Message()
            # # msg['Subject'] = "Test email from GSacata's Todolist"
            # msg['Subject'] = json_content["email_subject"]
            # msg['From'] = json_content["email_address"]
            # msg['To'] = json_content["email_address"]
            # password = json_content["email_password"]  # NÃO É A SENHA DO SEU EMAIL.
            # msg.add_header('Content-Type', 'text/html')
            # msg.set_payload(corpo_email)

            # s = smtplib.SMTP('smtp.gmail.com: 587')
            # s.starttls()
            # # Login Credentials for sending the mail
            # s.login(msg['From'], password)
            # s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))

            # print(f'Email sent to {json_content["email_address"]}')
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        email = get_object_or_404(self.queryset, pk=pk)
        email.delete()
        print('success delete action')
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=['post'])
    def test_email(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            print("custom POST funcionou")

            print(f"Preparing test email")
            content = JSONRenderer().render(serializer.data)
            json_content = json.loads(content)

            corpo_email = """
            <p>Email de teste</p>
            <p>Enviado pelo seu todolist. DEV!!</p>
            """

            # corpo_email = f"\n{serializer.data.keys},\n{serializer.data.values}"

            msg = email.message.Message()
            msg['Subject'] = "Test email from GSacata's Todolist"
            msg['From'] = json_content["email_address"]
            msg['To'] = json_content["email_address"]
            password = json_content["email_password"]  # NÃO É A SENHA DO SEU EMAIL.
            msg.add_header('Content-Type', 'text/html')
            msg.set_payload(corpo_email)

            s = smtplib.SMTP('smtp.gmail.com: 587')
            s.starttls()
            # Login Credentials for sending the mail
            s.login(msg['From'], password)
            s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))

            print(f'Email sent to {json_content["email_address"]}')

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    @action(detail=False, methods=['post'])
    def send_reminder(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            print("custom POST funcionou")

            print(f"Preparing reminder email")
            content = JSONRenderer().render(serializer.data)
            json_content = json.loads(content)

            # corpo_email = """
            # <p>Email de teste</p>
            # <p>Enviado pelo seu todolist. DEV!!</p>
            # """

            # corpo_email = f"\n{serializer.data.keys},\n{serializer.data.values}"

            msg = email.message.Message()
            # msg['Subject'] = "Test email from GSacata's Todolist"
            msg['Subject'] = json_content["email_subject"]
            msg['From'] = json_content["email_address"]
            msg['To'] = json_content["email_address"]
            password = json_content["email_password"]  # NÃO É A SENHA DO SEU EMAIL.
            corpo_email = f'Reminder from \"TodoList\" to finish {json_content["email_subject"]}'
            msg.add_header('Content-Type', 'text/html')
            msg.set_payload(corpo_email)

            s = smtplib.SMTP('smtp.gmail.com: 587')
            s.starttls()
            # Login Credentials for sending the mail
            s.login(msg['From'], password)
            s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))

            print(f'Email sent to {json_content["email_address"]}')

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)