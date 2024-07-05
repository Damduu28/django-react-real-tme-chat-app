
'''Use this for production'''

from .base import *

from decouple import config

ALLOWED_HOSTS += ['chatap-backend.vercel.app', '.vercel.app', '.now.sh']
DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config("DB_NAME"),
        'USER': config("DB_USER"),
        'PASSWORD': config("DB_PASSWORD"),
        'HOST': config("DB_HOST"),
        'PORT': config("DB_PORT"),
    }
}

CORS_ALLOWED_ORIGINS = [
    "chatap-frontend.vercel.app",
    ".vercel.app",
    ".now.sh",
]


WHITENOISE_USE_GZIP = True

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = 'farmicletestingbucket'
AWS_S3_SIGNATURE_NAME = 's3v4'
AWS_S3_REGION_NAME = 'us-east-2'  
AWS_S3_FILE_OVERWRITE = False
AWS_DEFAULT_ACT = None
AWS_S3_VERITY = True

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = "sulemed1753@gmail.com"
EMAIL_HOST_PASSWORD = "vqydowmkytkmgpua"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
