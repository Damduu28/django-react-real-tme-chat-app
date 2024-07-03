# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from django.core.files.base import ContentFile
from .models import *  # Import your Message model


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = await self.authenticate_user(self.scope)
        if not self.user:
            self.close()
        else:
            self.room_name = 'test'
            self.room_group_name = f'{self.room_name}'
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()

            await self.set_last_seen_message()

            recent_messages = await self.get_recent_messages_after_last_seen()
            for message in recent_messages:
                await self.send_message(message)
    
    async def disconnect(self, code):
        return self.channel_layer.group_discard(self.room_group_name, self.channel_layer)
    
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        media = data.get('media')

        if media:
            self.save_media(media)
        
        if message:
            self.send_message(message, self.user)
            self.save_message(message)

    async def send_message(self, message):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': self.user.username,
            }
        )
    
    async def chat_message(self, event):
        message = event['message']
        username = event['username']

        self.send(text_data=json.dumps({
            'message': message,
            'username': username,
        }))

    @database_sync_to_async
    def authenticate_user(self, scope):
        try:
            token = AccessToken(scope['query_string'].decode().split('=')[1])
            user = User.objects.get(id=token['user_id'])
            return user
        except Exception as e:
            print(e)
            return None
        
    @database_sync_to_async
    def save_message(self, message, user):
        Message.objects.create(user=user, content=message)

    @database_sync_to_async
    def save_media(self, media):
        media_name = media.name
        media_content = media.read()
        media_content_type = media.content_type
        # Continue Todo

    @database_sync_to_async
    def set_last_seen_message(self):
        last_message = Message.objects.filter(user=self.user)


# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken
from .models import Message  # Import your Message model
from django.core.files.base import ContentFile

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = await self.authenticate_user(self.scope)
        if not self.user:
            await self.close()
        else:
            self.room_name = 'chat_room'  # For demonstration purposes
            self.room_group_name = f'chat_{self.room_name}'
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()

            # Get and set the user's last seen message
            await self.set_last_seen_message()

            # Get recent messages from friends and send them to the user
            await self.send_recent_messages_from_friends()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message')
        media = data.get('media')

        if media:
            # Save the media file
            media_name = media['name']
            media_content = media['content']
            await self.save_media(media_name, media_content)

            # Create the message with media
            message = f'Media: {media_name}'

        if message:
            await self.save_message(message, self.user)
            await self.send(text_data=json.dumps({
                'message': message,
                'username': self.user.username,
            }))

    @database_sync_to_async
    def authenticate_user(self, scope):
        try:
            token = AccessToken(scope['query_string'].decode().split('=')[1])
            user = User.objects.get(id=token['user_id'])
            return user
        except Exception as e:
            print(e)
            return None

    @database_sync_to_async
    def save_message(self, message, user):
        Message.objects.create(user=user, content=message)

    @database_sync_to_async
    def save_media(self, media_name, media_content):
        # Save the media file
        media_file = ContentFile(media_content, name=media_name)
        return media_file

    @database_sync_to_async
    def set_last_seen_message(self):
        # Retrieve the last message seen by the user and set it as their last seen message
        last_message = Message.objects.filter(user=self.user).last()
        if last_message:
            self.user.last_seen_message_id = last_message.id
            self.user.save()

    @database_sync_to_async
    def get_recent_messages_between_user_and_friend(self, friend):
        # Get recent messages between the user and the specified friend
        recent_messages = Message.objects.filter(user=self.user, recipient=friend).order_by('-timestamp')[:10]
        return [{'message': message.content, 'username': message.user.username} for message in recent_messages]

    async def send_recent_messages_from_friends(self):
        # Get the user's friends
        friends = self.user.profile.friends.all()  # Assuming you have a profile model with a friends field

        for friend in friends:
            recent_messages = await self.get_recent_messages_between_user_and_friend(friend)
            for message in recent_messages:
                await self.send(text_data=json.dumps(message))
