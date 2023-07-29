from django import forms
from .models import UserProfile, Post, Comment

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['bio', 'location', 'birth_date']

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['text']

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text']