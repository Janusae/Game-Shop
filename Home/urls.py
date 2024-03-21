from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
urlpatterns = ([
    path("" , views.HomePageView.as_view() , name="home"),
    path("Productd" , views.ProductView.as_view() , name="Productd"),
    path("Adventure" , views.ProductView_Adventure.as_view() , name="ProductView_Adventure"),
    path("Strategy" , views.ProductView_Strategy.as_view() , name="ProductView_Strategy"),
    path("Racing" , views.ProductView_Racing.as_view() , name="ProductView_Racing"),
    path("Contact-Us" , views.ContactView.as_view() , name="Contact"),
    path("<int:pk>" , views.ProductDetailView.as_view() , name="Product_Detail")
]+static(settings.MEDIA_URL , document_root=settings.MEDIA_ROOT))