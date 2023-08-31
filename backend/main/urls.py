from django.urls import path
from . import views
urlpatterns = [
  path("login",views.login),
  path('signup',views.signup),
  path('hello',views.hello),
  path('upload_image',views.upload_image),
  path('getCsrf',views.getCsrf)
  
]