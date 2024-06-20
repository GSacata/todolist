from rest_framework import serializers
from .models import EmailModObj

class EmailModObjSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailModObj
        fields = ['id', 'email_address', 'email_password', 'email_subject']