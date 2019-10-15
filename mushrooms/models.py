# from djgeojson.fields import PolygonField
# from django.db import models
from django.contrib.gis.db import models


class MushroomSpot(models.Model):

    idmz = models.CharField(max_length=15, default='0000000', editable=False)
    # description = models.TextField()
    # picture = models.ImageField()
    geom = models.PolygonField()

    def __unicode__(self):
        return self.idmz

    # @property
    # def picture_url(self):
    #     return self.picture.url
