from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail

def Sending_Email(subject , to , context , template):
    try:
        http = render_to_string(template , context)
        plain_text = strip_tags(http)
        from_who = settings.EMAIL_HOST_USER
        send_mail(subject , plain_text , from_who , [to] , html_message=http)
        print("everything is successfully")

    except Exception as e:
        print(e)