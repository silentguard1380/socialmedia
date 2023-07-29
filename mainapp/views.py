
from django.shortcuts import render,redirect,HttpResponseRedirect,HttpResponse
from mainapp.forms import PostForm, CommentForm
from mainapp.models import Post, Comment

from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login,authenticate,get_user_model,logout
from django.http import JsonResponse, HttpResponseBadRequest




def home(request):
    return HttpResponse('hello world')



def signup_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        print(username,email)

        # if not username or not password or not email:
        #     return HttpResponseBadRequest("Username, password, and email are required.")
        if User.objects.filter(username=username).exists():
            return HttpResponseBadRequest("Username already exists.")
        if User.objects.filter(email=email).exists():
            return HttpResponseBadRequest("Email already exists.")
        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()
        login(request,user)
        # return JsonResponse({'status': 'success'})
        return redirect('/')



    return render(request, 'sign.html', {})


def login_user(request):

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/')

    return render(request, 'login.html')

@login_required
def logout_user(request):


        logout(request)

        return HttpResponseRedirect('/')

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