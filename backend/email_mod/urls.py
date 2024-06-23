from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_emails),
    path('<pk>/', views.detail_email),
    # path('<pk>/', views.save_and_test_email),
]