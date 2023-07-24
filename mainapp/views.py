from django.shortcuts import render
from django.shortcuts import render,redirect,HttpResponseRedirect


from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login,authenticate,get_user_model,logout
from django.http import JsonResponse, HttpResponseBadRequest



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



    return render(request, 'register.html', {})


def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username,password)
    # print(f'is user authenticated: {request.user.is_authenticated}')

        print(request.user)


        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request,user)
            print(user)

            return redirect('/')
        else:
            print('error')

    return render(request,'login.html',context={})

@login_required
def logout_user(request):


        logout(request)

        return HttpResponseRedirect('/')

