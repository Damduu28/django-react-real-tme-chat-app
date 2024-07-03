from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview),
    path('users/', views.UsersViews.as_view(), name='users'),
    path('users/<str:pk>/detail/', views.UserDetailView.as_view(), name='user-detail'),
    path('users/friend/<str:pk>/detail/', views.UserFriendDetailView.as_view(), name='user-friend-detail'),
    path('users/<email>/confirm/', views.userEmailConfirmView, name='email-confirm'),
    path('users/status/<str:pk>/update/', views.updateUserStatus, name='update-status'),
    path('users/register/', views.UserRegisterView.as_view(), name='signup')
]