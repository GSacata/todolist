from django.urls import path
# from . import views
from .views import ListEmailModObj, DetailChangeEmailModObj
from rest_framework.routers import DefaultRouter

# urlpatterns = [
#     path('', views.list_and_send_reminder_email),
#     path('<pk>/', views.detail_email),
#     # path('<pk>/', views.save_and_test_email),
# ]


router = DefaultRouter()
router.register(r'', ListEmailModObj)

urlpatterns = router.urls