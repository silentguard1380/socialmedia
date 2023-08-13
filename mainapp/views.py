
from django.shortcuts import render,redirect,HttpResponseRedirect,HttpResponse
from mainapp.forms import PostForm, CommentForm, RegisterForm
from mainapp.models import Post, Comment
from django.views import View
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login,authenticate,get_user_model,logout
from django.http import JsonResponse, HttpResponseBadRequest, HttpRequest
from .models import User


def home(request):
    return render(request,'index.html',context={})


def signup_user(request):
    if request.method == 'POST':

        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        print(username,email)
        print(password)
        # if not username or not password or not email:
        #     return HttpResponseBadRequest("Username, password, and email are required.")
        if User.objects.filter(username=username).exists():
            return HttpResponseBadRequest("Username already exists.")
        if User.objects.filter(email=email).exists():
            return HttpResponseBadRequest("Email already exists.")
        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()
        login(request,user)
        print(username, email)

        # return JsonResponse({'status': 'success'})
        return redirect('/')



    return render(request, 'registerUser.html', {})


class RegisterView(View):
    def get(self, request: HttpRequest):
        register_form: RegisterForm = RegisterForm()
        return render(request, r'registerUser.html', context={
            'register_form': register_form
        })

    def post(self, request: HttpRequest):
        register_form: RegisterForm = RegisterForm(request.POST)
        if register_form.is_valid() == True:
            is_registered: User & bool = User.objects.filter(email__iexact=register_form.cleaned_data.get('email')).exists()
            if is_registered == False:
                new_user: User = User()
                new_user.username = register_form.cleaned_data.get('username')
                new_user.email = register_form.cleaned_data.get('email')
                new_user.month = register_form.cleaned_data.get()

        return render(request, r'registerUser.html', context={
            'register_form': register_form
        })

def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username,password)
        if username and password:
            try:
                user = authenticate(request, usernaem=username, password=password)
                print(user)
                if user is not None:
                    login(request, user)
                    return redirect('/')
                else:
                    error_message = 'Invalid email or password.'
            except Exception as e:
                error_message = str(e)
        else:
            error_message = 'Please provide email and password.'

        # نمایش پیام خطا یا اعلان به کاربر
        context = {
            'error_message': error_message
        }
        print(context)
        return render(request, 'loginUser.html', context)

    return render(request, 'loginUser.html')

def logout_user(request):


        logout(request)

        return redirect('/')

def posts(request):
    posts = Post.objects.all()
    post_form = PostForm()
    comment_form = CommentForm()

    if request.method == 'POST':
        if 'post_btn' in request.POST:
            post_form = PostForm(request.POST)
            if post_form.is_valid():
                post = post_form.save(commit=False)
                post.user = request.user
                post.save()
                return redirect('home')

        if 'comment_btn' in request.POST:
            comment_form = CommentForm(request.POST)
            if comment_form.is_valid():
                comment = comment_form.save(commit=False)
                comment.user = request.user
                comment.post = Post.objects.get(id=request.POST.get('post_id'))
                comment.save()
                return redirect('')

    context = {
        'posts': posts,
        'post_form': post_form,
        'comment_form': comment_form
    }
    return render(request, 'home.html', context)