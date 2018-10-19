from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/')

    def __str__(self):
        return '{} {}\'s profile'.format(self.user.first_name, self.user.last_name)


@receiver(post_save, sender=User)
def create_profile(sender, **kwargs):
    try:
        Profile.objects.get(user=kwargs.get('instance'))
    except Profile.DoesNotExist:
        Profile.objects.create(user=kwargs.get('instance'))


class Student(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='students')
    first_name = models.TextField(max_length=20)
    last_name = models.TextField(max_length=20, blank=True)
    status = models.TextField(max_length=30, blank=True)
    bio = models.TextField(max_length=200, blank=True)
    contact_phone = models.TextField(max_length=10, blank=True)
    contact_email = models.EmailField(max_length=50, blank=True)

    def __str__(self):
        return 'student {} {}'.format(self.first_name, self.last_name)


class Course(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='courses')
    name = models.TextField(max_length=30)
    goal = models.TextField(max_length=150)

    def __str__(self):
        return '{}\'s {} course'.format(self.student, self.name)


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    datetime = models.DateTimeField()
    desc = models.TextField(max_length=300)

    def __str__(self):
        return '{}\'s {} lesson on {}'.format(self.course.student, self.course, self.datetime)


class Homework(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    desc = models.TextField(max_length=300)

    def __str__(self):
        return 'homework for {}'.format(self.lesson)