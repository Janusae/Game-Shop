from django import forms
from .models import Comment, Subscriber


class ContactForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['name',"surname" ,"email","subject","text"]
        widgets = {
            "name" : forms.TextInput(attrs={'id':'name' , "placeholder" : "Enter your name"}),
            "surname" : forms.TextInput(attrs={'id':'surname', "placeholder" : "Enter your surname"}),
            "subject" : forms.TextInput(attrs={'id':'subject', "placeholder" : "Enter your subject"}),
            "text" : forms.Textarea(attrs={'id':'message', "placeholder" : "Enter your message"}),
            "email" : forms.EmailInput(attrs={'id':'email', "placeholder" : "Enter your email"})
        }

class SubscriberForm(forms.ModelForm):
    class Meta:
        model = Subscriber
        fields = ["email"]
        # widgets = {
        #     "email" : forms.TextInput(attrs={'placeholder': 'Enter your email', 'class': 'form-control', 'id': 'exampleInputEmail1'})  }