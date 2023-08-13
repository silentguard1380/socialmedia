from django import forms
from .models import Post, Comment, User

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['bio', 'location', 'birth_date']



class RegisterForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'month', 'password']

        widgets = {
            'username': forms.TextInput(attrs={
                'type': "text",
                'class': "w-full bg-[rgba(0,0,0,0)] border border-borderColor py-3 px-2 rounded-lg transition-all duration-200 focus:border-primary focus:placeholder:text-primary focus:placeholder:text-sm",
                'placeholder': 'name',
                'name': 'username'
            }),
            'email': forms.TextInput(attrs={
                'type': "email",
                'class': "w-full bg-[rgba(0,0,0,0)] border border-borderColor py-3 px-2 rounded-lg transition-all duration-200 focus:border-primary focus:placeholder:text-primary focus:placeholder:text-sm",
                'placeholder': 'email',
                'name': 'email'
            })
        }


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['text']



class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text']