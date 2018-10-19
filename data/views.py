from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Student, Course, Lesson
from django.contrib.auth.models import User
from .serializers import ProfileSerializer, StudentSerializer, LessonSerializer
import datetime


class UserSingle(APIView):

    def get(self, request):
        user = request.user
        serialized = ProfileSerializer(user.profile)
        return Response(serialized.data)


class StudentMany(APIView):

    def get(self, request):
        user = request.user
        serialized = StudentSerializer(user.students.all(), many=True)
        return Response(serialized.data)


class StudentSingle(APIView):

    def get(self, request, pk):
        serialized = StudentSerializer(Student.objects.get(id=pk))
        return Response(serialized.data)

# API View for a main page
class MainView(APIView):

    def get(self, request):
        current_day = datetime.date.today()
        # getting a datetime for a monday of current week with zero hours and minutes
        monday_limiter = datetime.datetime.combine((current_day - datetime.timedelta(days=current_day.weekday())),
                                                   datetime.time(0, 0))
        # getting a datetime of sunday of current week with 23 hours and minutes
        sunday_limiter = datetime.datetime.combine((current_day - datetime.timedelta(days=-7 + current_day.weekday())),
                                                   datetime.time(23, 59))
        # filtering lessons owned by user and only happening on current week
        week_lessons = Lesson.objects.all().filter(course__student__teacher=request.user).filter(
            datetime__gte=monday_limiter).filter(datetime__lt=sunday_limiter)
        serialized = LessonSerializer(week_lessons, many=True)
        return Response(serialized.data)
