from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin

from .models import MzsCallao


@admin.register(MzsCallao)
class MzsCallaoAdmin(LeafletGeoAdmin):
    list_display = ('idmz', 'DISTRITO', 'discapac', 'dishom', 'dismuj')
    list_filter = ('DISTRITO',)
    search_fields = ('idmz', 'UBIGEO')
