from django.http import Http404
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.generic import TemplateView, ListView, DetailView, FormView, CreateView
from app_module.models import Footer_information , Header_information , Slide , Website_Information
from .models import Product , Comment , Genre , Multi_tags  , Subscriber
from .form import ContactForm, SubscriberForm


# Create your views here.
class HomePageView(FormView):
    template_name = "Home/Index.html"
    model = Subscriber
    form_class = SubscriberForm
    success_url = "product"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['slide'] = Slide.objects.filter(id=1).first()
        context["product"] = Product.objects.all()[:4]
        return context
    def form_valid(self, form):
        form.save()
        return redirect(reverse("home"))


def django_render_header(request):
    setting = Header_information.objects.filter(main_setting=True).first()
    return render(request , "header.html" , {"setting" : setting})

def django_render_footer(request):
    footer_setting = Footer_information.objects.filter(main_setting=True).first()
    return render(request , "footer.html",{"setting":footer_setting})
class ProductView(ListView):
    template_name = "Home/product.html"
    model = Product
    context_object_name = "data"
    paginate_by = 8
    def get_queryset(self):
        queryset = Product.objects.order_by("-id")
        return queryset

class ProductView_Adventure(ListView):
    template_name = "Home/product.html"
    model = Product
    context_object_name = "data"
    paginate_by = 8
    def get_queryset(self):
        return Product.objects.filter(genre__genre__exact="Adventure")
class ProductDetailView(DetailView):
    model = Product
    context_object_name = "data"
    template_name = "Home/product_detail.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["genre"] = Genre.objects.filter(product=self.object)
        context["tag"] = Multi_tags.objects.filter(product=self.object)
        return context
class ContactView(FormView):
    template_name = "Home/contact_us.html"
    model = Comment
    form_class = ContactForm
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["data"] = Website_Information.objects.filter(id=1).first()
        return context
    def form_valid(self, form):
        form.save()
        return redirect(reverse("home"))
    def form_invalid(self, form):
        raise Http404("Your information is not valid!")
class ProductView_Strategy(ListView):
    template_name = "Home/product.html"
    model = Product
    context_object_name = "data"
    paginate_by = 8
    def get_queryset(self):
        return Product.objects.filter(genre__genre__exact="Strategy")
class ProductView_Racing(ListView):
    template_name = "Home/product.html"
    model = Product
    context_object_name = "data"
    paginate_by = 8
    def get_queryset(self):
        return Product.objects.filter(genre__genre__exact="Racing")