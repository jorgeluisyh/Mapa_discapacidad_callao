
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

Configure environment variables (secret key, DEBUG flag, allowed hosts and
database credentials are no longer hardcoded in the repo):

.. code-block:: bash

    cp .env.example .env
    # then edit .env with your own values

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
If you want to work with a database already created in postgis use the next command to get the models
(note: this writes to the current directory, so run it from inside an app
such as ``manzanas/`` rather than the project root):

.. code-block:: bash

	python manage.py inspectdb > models.py
