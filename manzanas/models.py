from django.contrib.gis.db import models


class MzsCallao(models.Model):
    idmz = models.CharField(max_length=15, blank=True, null=True)
    geom = models.MultiPolygonField()
    discapac = models.IntegerField(blank=True, null=True)
    dishom = models.IntegerField(blank=True, null=True)
    dismuj = models.IntegerField(blank=True, null=True)
    UBIGEO = models.CharField(max_length=6, blank=True, null=True)
    DISTRITO = models.CharField(max_length=60, blank=True, null=True)

    def __str__(self):
        return self.idmz or f'MzsCallao #{self.pk}'

    class Meta:
        ordering = ('idmz',)
        managed = False
        db_table = 'mzs_callao'
        verbose_name_plural = 'Manzanas'
