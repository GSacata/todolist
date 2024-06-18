from django.urls import path
from . import views
# from .views import TodoTaskListCreate, TodoTaskDetailUpdateDestroy

# urlpatterns = [
#     path('', TodoTaskListCreate.as_view()),
#     path('<pk>/', TodoTaskDetailUpdateDestroy.as_view()),
# ]


urlpatterns = [
    path('', views.list_and_add_tasks),
    # path('<pk>/', ),
]