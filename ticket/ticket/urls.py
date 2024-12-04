"""
URL configuration for ticket project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from home.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('movie/',include('rest_framework.urls')),
    path('movie/token/',TokenObtainPairView.as_view(),name='access'),
    path('movie/refresh_token/',TokenRefreshView.as_view(),name='refresh'),
    path('movie/user/',UserView.as_view(),name='user'),
    path('movie/movies_list/',MovieView.as_view(),name='movies'),
    path('api/save-booking/', save_booking, name='save-booking'),
    path('api/booked-seats/<int:movie_id>/', get_booked_seats, name='booked-seats'),
    
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)