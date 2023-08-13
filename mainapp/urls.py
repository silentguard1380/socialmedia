from django.urls import path
from .views import RegisterView

urlpatterns = [
    path('register/', view=RegisterView.as_view(), name='register-page')
]
