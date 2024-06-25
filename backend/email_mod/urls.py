from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_and_send_reminder_email),
    path('<pk>/', views.detail_email),
    # path('<pk>/', views.save_and_test_email),
]