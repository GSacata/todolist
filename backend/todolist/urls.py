from django.urls import path
from .views import TodoTaskListCreate, TodoTaskDetailUpdateDestroy

urlpatterns = [
    path('', TodoTaskListCreate.as_view()),
    path('<pk>/', TodoTaskDetailUpdateDestroy.as_view()),
]