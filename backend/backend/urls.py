from django.contrib import admin
from django.urls import path
from main import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('loginApi',views.loginApi),
    path('signup',views.signup),
    path('hello',views.hello),
    path('upload_image',views.upload_image),
  path('getCsrf',views.getCsrf)
]
