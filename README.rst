
.. note::

    This project uses postgis

Install
=======

Install Gdal:
to instal gdal 2.2 in your enviroment use:

.. code-block:: bash

    conda install -c conda-forge gdal

Install Django dependencies:

.. code-block:: bash

    pip install -r requirements.txt

Initialize database tables:

.. code-block:: bash

    python manage.py migrate

Create a super-user for the admin:

.. code-block:: bash

    python manage.py createsuperuser

Run
===

.. code-block:: bash

    python manage.py runserver

The map visible on http://127.0.0.1:8000/ can be edited from the AdminSite at ``/admin``.

to make the server visible for other pc's in the same network

.. code-block:: bash

    python manage.py runserver 0.0.0.0:8000



OBS
===
If you want to work with a database already created in postgis use de next command to get the models

.. code-block:: bash

	python manage.py inspectdb > models.py

I got this error and found that it was caused by using psycopg2 version 2.8 (or 2.8.1) -- downgrading to 2.7.7 made it go away. This is on Windows 10 with Django 2.2.

.. code-block:: bash

	pip install psycopg2==2.7.7 --force-reinstall


Edit: I see now that there's a fix in the pipeline for Django 2.2 to support psycopg2 2.8.

Edit (5/1/2019): Django 2.2.1 is out today with a fix adding support for psycopg2 2.8.
