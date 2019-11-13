# from djgeojson.fields import PolygonField
# from django.db import models
from django.contrib.gis.db import models


# class MushroomSpot(models.Model):
#
#     idmz = models.CharField(max_length=15, default='0000000', editable=False)
#     # description = models.TextField()
#     # picture = models.ImageField()
#     geom = models.PolygonField()
#
#     def __unicode__(self):
#         return self.idmz
#
#     # @property
#     # def picture_url(self):
#     #     return self.picture.url

class MzsCallao(models.Model):
    # id = models.AutoField()
    idmz = models.CharField(max_length=15, blank=True, null=True)
    # geom = models.TextField(blank=True, null=True)  # This field type is a guess.
    geom = models.MultiPolygonField()  # This field type is a guess.
    discapac = models.IntegerField(blank=True, null=True)
    dishom = models.IntegerField(blank=True, null=True)
    dismuj = models.IntegerField(blank=True, null=True)
    UBIGEO = models.CharField(max_length=6, blank=True, null=True)
    DISTRITO = models.CharField(max_length=60, blank=True, null=True)



    def __unicode__(self):
        return self.idmz

    class Meta:
        ordering = ('idmz',)
        managed = False
        db_table = 'mzs_callao'
        verbose_name_plural = 'Manzanas'