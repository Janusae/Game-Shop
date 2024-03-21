from django import forms
from django.core.exceptions import ValidationError

from .models import User

class Register_Form(forms.Form):
    username = forms.CharField(label="نام کاربری" , widget=forms.TextInput(attrs={"placeholder": "Enter your username"}))
    email = forms.EmailField(label="ایمیل" , widget=forms.EmailInput(attrs={"placeholder": "Enter your email"}))
    password = forms.CharField(label="گذرواژه" , widget=forms.PasswordInput(attrs={"placeholder": "Enter your password"}))
    confirm_password = forms.CharField(label="تکرار گذرواژه" , widget=forms.PasswordInput(attrs={"placeholder": "Enter your confirm password"}))


    def clean_confirm_password(self):
        passwd = self.cleaned_data["password"]
        confirm_passwd = self.cleaned_data["confirm_password"]
        if passwd == confirm_passwd:
            return confirm_passwd
        else :
            raise ValidationError(confirm_passwd , "Your password and your confirm password is not tha same!")

class Login_Form(forms.Form):
    email = forms.EmailField(label="ایمیل", widget=forms.EmailInput(attrs={"placeholder": "Enter your email" , "class" : "login__input"}))
    password = forms.CharField(label="گذرواژه",widget=forms.PasswordInput(attrs={"placeholder": "Enter your password" , "class" : "login__input"}))
class Forget_Form(forms.Form):
    email = forms.EmailField(label="ایمیل", widget=forms.EmailInput(attrs={"placeholder": "Enter your email", "class" : "login__input"}))
class Resesat_Form(forms.Form):
    password = forms.CharField(label="گذرواژه" , widget=forms.PasswordInput(attrs={"placeholder": "Enter your password", "class" : "login__input"}))
    confirm_password = forms.CharField(label="تکرار گذرواژه" , widget=forms.PasswordInput(attrs={"placeholder": "Enter your confirm password", "class" : "login__input"}))


    def clean_confirm_password(self):
        passwd = self.cleaned_data["password"]
        confirm_passwd = self.cleaned_data["confirm_password"]
        if passwd == confirm_passwd:
            return confirm_passwd
        else :
            raise ValidationError(confirm_passwd , "Your password and your confirm password is not tha same!")