from . import views
from django.conf.urls import url, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    url(r'auth/token/obtain$', TokenObtainPairView.as_view()),
    url(r'auth/token/refresh$', TokenRefreshView.as_view()),
    url(r'api/students/(?P<pk>\d+)$', views.StudentSingle.as_view()),
    url(r'api/students$', views.StudentMany.as_view()),
    url(r'api/profile$', views.UserSingle.as_view()),
    url(r'api/lessons/(?P<pk>\d+)$', views.LessonSingle.as_view()),
    url(r'api/lessons', views.LessonMany.as_view()),
    url(r'api/courses/', views.CourseMany.as_view()),
    url(r'api/main$', views.MainView.as_view())
]