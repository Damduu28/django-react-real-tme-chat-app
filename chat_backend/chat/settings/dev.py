from .base import *

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173"
]


CORS_ORIGIN_ALLOW_ALL = True
