# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.gis.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Capitales(models.Model):
    gid = models.AutoField(primary_key=True)
    idccpp = models.CharField(max_length=10, blank=True, null=True)
    nombccpp = models.CharField(max_length=60, blank=True, null=True)
    codccpp = models.CharField(max_length=4, blank=True, null=True)
    area = models.IntegerField(blank=True, null=True)
    nomdist = models.CharField(max_length=60, blank=True, null=True)
    nomprov = models.CharField(max_length=40, blank=True, null=True)
    nomdep = models.CharField(max_length=35, blank=True, null=True)
    ubigeo = models.CharField(max_length=6, blank=True, null=True)
    ccpp = models.CharField(max_length=10, blank=True, null=True)
    pobcencp = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    geom = models.PointField(srid=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'capitales'


class CitiesCity(models.Model):
    name = models.CharField(max_length=100)
    geometry = models.PointField()

    class Meta:
        managed = False
        db_table = 'cities_city'


class DepartamentosPeru(models.Model):
    gid = models.AutoField(primary_key=True)
    objectid = models.BigIntegerField(blank=True, null=True)
    iddpto = models.CharField(max_length=2, blank=True, null=True)
    nombdep = models.CharField(max_length=25, blank=True, null=True)
    count_idpr = models.BigIntegerField(blank=True, null=True)
    count_iddi = models.BigIntegerField(blank=True, null=True)
    shape_leng = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    shape_area = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    geom = models.MultiPolygonField(srid=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'departamentos_peru'


class Discap(models.Model):
    index = models.BigIntegerField(blank=True, null=True)
    objectid = models.BigIntegerField(db_column='OBJECTID', blank=True, null=True)  # Field name made lowercase.
    grup = models.FloatField(blank=True, null=True)
    idmanzana = models.TextField(blank=True, null=True)
    ttotal = models.IntegerField(blank=True, null=True)
    hhom = models.IntegerField(blank=True, null=True)
    mmuj = models.IntegerField(blank=True, null=True)
    pver = models.FloatField(db_column='Pver', blank=True, null=True)  # Field name made lowercase.
    poir = models.FloatField(db_column='Poir', blank=True, null=True)  # Field name made lowercase.
    phablar = models.FloatField(db_column='Phablar', blank=True, null=True)  # Field name made lowercase.
    pmov_camin = models.FloatField(db_column='Pmov_camin', blank=True, null=True)  # Field name made lowercase.
    pent_apren = models.FloatField(db_column='Pent_apren', blank=True, null=True)  # Field name made lowercase.
    prelac_cl_demas = models.FloatField(db_column='Prelac_cl_demas', blank=True, null=True)  # Field name made lowercase.
    con2omas_disc = models.FloatField(db_column='Con2omas_disc', blank=True, null=True)  # Field name made lowercase.
    recuento = models.FloatField(db_column='Recuento', blank=True, null=True)  # Field name made lowercase.
    menor6a = models.FloatField(blank=True, null=True)
    de6a11a = models.FloatField(db_column='De6a11a', blank=True, null=True)  # Field name made lowercase.
    de12a17a = models.FloatField(db_column='De12a17a', blank=True, null=True)  # Field name made lowercase.
    de18a29a = models.FloatField(db_column='De18a29a', blank=True, null=True)  # Field name made lowercase.
    de30a44a = models.FloatField(blank=True, null=True)
    de45a59a = models.FloatField(db_column='De45a59a', blank=True, null=True)  # Field name made lowercase.
    de60amas = models.FloatField(db_column='De60amas', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'discap'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Mzs130101Z1(models.Model):
    gid = models.AutoField(primary_key=True)
    objectid = models.BigIntegerField(blank=True, null=True)
    idmanzana = models.CharField(max_length=20, blank=True, null=True)
    coddpto = models.CharField(max_length=2, blank=True, null=True)
    codprov = models.CharField(max_length=2, blank=True, null=True)
    coddist = models.CharField(max_length=2, blank=True, null=True)
    codzona = models.CharField(max_length=3, blank=True, null=True)
    sufzona = models.CharField(max_length=2, blank=True, null=True)
    codmzna = models.CharField(max_length=3, blank=True, null=True)
    sufmzna = models.CharField(max_length=2, blank=True, null=True)
    ubigeo = models.CharField(max_length=6, blank=True, null=True)
    codccpp = models.CharField(max_length=4, blank=True, null=True)
    departamen = models.CharField(max_length=60, blank=True, null=True)
    provincia = models.CharField(max_length=60, blank=True, null=True)
    distrito = models.CharField(max_length=60, blank=True, null=True)
    nomcccpp = models.CharField(max_length=60, blank=True, null=True)
    shape_leng = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    shape_area = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    geom = models.PolygonField(srid=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mzs_130101_z1'


class MzsCallao(models.Model):
    id = models.AutoField()
    idmz = models.CharField(max_length=-1, blank=True, null=True)
    geom = models.GeometryField(srid=0, blank=True, null=True)
    discapac = models.IntegerField(blank=True, null=True)
    dishom = models.IntegerField(blank=True, null=True)
    dismuj = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mzs_callao'


class MzsCallao1(models.Model):
    gid = models.AutoField(primary_key=True)
    objectid = models.BigIntegerField(blank=True, null=True)
    idmanzana = models.CharField(max_length=15, blank=True, null=True)
    shape_star = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    shape_stle = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    geom = models.MultiPolygonField(srid=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mzs_callao_1'


class NewShapefile(models.Model):
    gid = models.AutoField(primary_key=True)
    id = models.IntegerField(blank=True, null=True)
    numerovert = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    gener = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    geom = models.MultiPolygonField(srid=0, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'new_shapefile'
