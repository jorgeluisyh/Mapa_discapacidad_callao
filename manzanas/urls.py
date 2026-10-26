"""manzanas URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from djgeojson.views import GeoJSONLayerView

from .models import MzsCallao

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path(
        'data.geojson',
        GeoJSONLayerView.as_view(
            model=MzsCallao,
            properties=('discapac', 'dishom', 'dismuj', 'UBIGEO', 'DISTRITO'),
        ),
        name='data',
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
