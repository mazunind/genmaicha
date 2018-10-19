from django.contrib import admin
from .models import Student, Profile, Course, Lesson, Homework

admin.site.register(Profile)
admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(Homework)