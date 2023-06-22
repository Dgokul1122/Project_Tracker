
from django.contrib import admin 
from django.urls import path, include
from project_tracker import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'tasks', views.ProjectView, 'task')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('project_tracker.urls')),
    path('api/', include(router.urls)),
    
    
]
