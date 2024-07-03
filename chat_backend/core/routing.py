from django.urls import re_path
from . import consumers

websocket_urlspatterns = [
    re_path('ws/socket-server/', consumers.ChatConsumer.as_asgi())
]