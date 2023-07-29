from django.contrib import admin
from .models import UserProfile,Comment,Post
# Register your models here.


admin.site.register(Post)
admin.site.register(UserProfile)
admin.site.register(Comment)