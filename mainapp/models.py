from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    class months(models.TextChoices):
        january = ('jan', 'january')
        february = ('feb', 'february')
        march = ('ma', 'march')
        april = ('ap', 'april')
        may = ('m', 'may')
        june = ('ju', 'june')
        july = ('jul', 'july')
        august = ('aug', 'august')
        september = ('sep', 'september')
        october = ('oct', 'october')
        november = ('nov', 'november')
        december = ('dec', 'december')

    select_user = models.OneToOneField('User', on_delete=models.CASCADE, verbose_name='کاربر', null=True)
    follows = models.ManyToManyField('User', blank=True, related_name='followed_by')
    avatar = models.ImageField(upload_to='users/', null=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateTimeField(null=True, blank=True)
    month = models.CharField(max_length=300, choices=months.choices, null=True, blank=True)

    def __str__(self):
        return str(self.id)
    
    class Meta:
        verbose_name = 'کاربر'
        verbose_name_plural = 'لیست کاربر ها'



class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    text = models.TextField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='images/', null=True)

    def __str__(self):
        return f'{self.user}'
    
    class Meta:
        verbose_name = 'پست'
        verbose_name_plural = 'لیست پست ها'



class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user}'
    
    class Meta:
        verbose_name = 'کامنت'
        verbose_name_plural = 'لیست کامنت ها'