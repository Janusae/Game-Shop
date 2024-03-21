from django.urls import path
from . import views
urlpatterns = [
    path('Register' , views.RegisterView.as_view() , name ="Register"),
    path('login' , views.LoginView.as_view() , name ="login"),
    path('logout' , views.LogoutView.as_view() , name ="logout"),
    path('forget' , views.ForgetView.as_view() , name ="forget"),
    path('about-us' , views.About_usView.as_view() , name ="about_us"),
    path('active-account/<code>' , views.ActiveAccount.as_view() , name = "ActiveAccount"),
    path('change-password/<code>' , views.ChangePassView.as_view() , name = "changePassword")
]