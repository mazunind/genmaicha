from rest_framework import serializers
from .models import Student, Lesson, Profile, Course, Homework
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ('user', 'avatar')


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('first_name', 'last_name', 'status', 'bio', 'contact_phone', 'contact_email')


class CourseSerializer(serializers.ModelSerializer):
    student = StudentSerializer()

    class Meta:
        model = Course
        fields = ('student', 'name', 'goal')


class LessonSerializer(serializers.ModelSerializer):
    course = CourseSerializer()

    class Meta:
        model = Lesson
        fields = ('course', 'datetime', 'desc')


class HomeworkSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer()

    class Meta:
        model = Homework
        fields = ('lesson', 'desc')