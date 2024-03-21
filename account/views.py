from django.contrib.auth import login, logout
from django.http import Http404
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
from django.views.generic import TemplateView

from .models import User
from account.form import Register_Form, Login_Form, Forget_Form, Resesat_Form
from django.utils.crypto import get_random_string
from email_service.email import Sending_Email
from Home.models import Product
# Create your views here.

class RegisterView(View):
    def get(self , request):
        form = Register_Form
        return render(request , "account/register.html",{"form":form})
    def post(self , request):
        form = Register_Form(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            user : bool = User.objects.filter(email__exact=email).exists()
            if not user:
                username = form.cleaned_data.get("username")
                password = form.cleaned_data.get("password")
                new_user = User(email=email , username=username , is_active=False , email_active=get_random_string(94) )
                new_user.set_password(password)
                new_user.save()
                Sending_Email("فعال سازی حساب کاربری" , new_user.email , {'user':new_user} , "active_account.html")
                return redirect(reverse("home"))
            else:
                raise Http404("Your email is already exits!")
        else :
            raise Http404("Your information is not valid!")


class ActiveAccount(View):
    def get(self , request , code):
        user = User.objects.filter(email_active=code).first()
        if user is not None:
            if not user.is_active:
                user.is_active = True
                user.save()
                return redirect(reverse("home"))
            else :
                raise Http404("Your account is already active")
        else:
            raise Http404("We could not find your account")
class LoginView(View):
    def get(self , request):
        form = Login_Form
        return render(request , "account/login.html",{"form":form})
    def post(self , request):
        form = Login_Form(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            user = User.objects.filter(email__iexact=email).first()
            if user is not None:
                if user.is_active:
                    password = form.cleaned_data.get('password')
                    check = user.check_password(password)
                    if check :
                        login(request ,user)
                        return redirect(reverse("home"))
                    else :
                        raise Http404("Your password or your email is incorrect!")
                else:
                    raise Http404("Your account is not active yet!")
            else:
                raise Http404("We could not find your account!")

class LogoutView(View):
    def get(self , request):
        logout(request)
        return redirect(reverse("home"))

class ForgetView(View):
    def get(self , request):
        form = Forget_Form
        return render(request , "account/forget.html",{"form":form})
    def post(self , request):
        form = Forget_Form(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            user = User.objects.filter(email__iexact=email).first()
            if user is not None:
                user.email_active = get_random_string(94)
                user.save()
                Sending_Email("تغییر رمز کاربر" , user.email , {"user":user} , "change_pass.html")
                return redirect(reverse("home"))
            else:
                raise Http404("We could not find your account!")
        else:
            raise Http404("Your information is incorrect!")
class ChangePassView(View):
    def get(self, request, code):
        form = Resesat_Form
        return render(request , "account/reseat_pass.html",{"form":form})

    def post(self ,request , code):
        form = Resesat_Form(request.POST)
        if form.is_valid():
            user = User.objects.filter(email_active__iexact=code).first()
            if user is not None:
                password = form.cleaned_data.get('password')
                user.set_password(password)
                user.email_active = get_random_string(94)
                user.save()
                return redirect(reverse("home"))
            else:
                raise Http404("Your password is incorrect!")

class About_usView(TemplateView):
    template_name = "account/about_us.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["data"] = Product.objects.filter(id=5).first()
        return context