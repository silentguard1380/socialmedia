from django.shortcuts import render,redirect,HttpResponseRedirect,HttpResponse
from mainapp.forms import PostForm, CommentForm
from mainapp.models import Post, Comment

from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login,authenticate,get_user_model,logout
from django.http import JsonResponse, HttpResponseBadRequest
from .forms import UserProfileForm

from .models import Post

def home(request):
    if request.POST:
        tweetinput=request.POST.get('tweetinput')
        Post.objects.create(user_id=request.user.id,text=tweetinput)

    try:

        user_profile = request.user.userprofile

        user = request.user  # دریافت کاربر لاگین شده
        user_posts = Post.objects.filter(user=user)

        contex={'username':request.user.username,
                'name':request.user.username,
                'profile_image' : user_profile.profile_image,
                'post':user_posts


                }
        return render(request, 'index.html', context=contex)
    except:


        return render(request,'index.html',context={})

# def tweet(request):
#     if request.POST:
#         tweetinput=request.POST.get('tweetinput')
#         Post.objects.create(text=tweetinput)
#
#




def signup_user(request):
    if request.method == 'POST':
        first_name = request.POST.get('firstname')
        last_name = request.POST.get('lastname')
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
        user = User.objects.create_user(first_name=first_name,last_name=last_name,username=username, password=password, email=email)
        user.save()
        login(request,user)
        print(username, email)

        # return JsonResponse({'status': 'success'})
        return redirect('/')



    return render(request, 'registerUser.html', {})


def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username,password)
        if username and password:
            try:
                user = authenticate(request, username=username, password=password)
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

@login_required(login_url='login')
def userprofile(request):
    user_profile = request.user.userprofile

    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=user_profile)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = UserProfileForm(instance=user_profile)

    context = {'form': form,
               'username':request.user.username,
               'background_image':request.user.userprofile.background_image}
    return render(request, 'userProfile.html', context)