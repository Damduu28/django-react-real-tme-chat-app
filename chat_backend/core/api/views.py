from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from core.models import *
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from django.utils import timezone

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def apiOverview(request):
    baseUrl = 'http://127.0.0.1:8000/api'
    api_urls = {
        'All User': '{}/users/'.format(baseUrl),
        'Detail User': '{}/users/'.format(baseUrl),
        'Register User': '{}/users/register/'.format(baseUrl),
    }
    return Response(api_urls)

@api_view(['PUT'])
def updateUserStatus(request, pk):
    # user_id = request.data.get('userId')
    print('User ID:', pk)
    user = User.objects.get(id=pk)
    user.status = "Not Active"
    user.last_login = timezone.now()
    user.save()
    return Response({"message": f"Thank you '{user.username.capitalize()}' for creating account with us come back and make new friends..."})


@api_view(['GET'])
def userEmailConfirmView(request, email):
    user = User.objects.filter(email=email)
    serializer = UserSerializer(user, many=True, context={'request': request})
    return Response(serializer.data)

class UsersViews(generics.ListAPIView):
    # permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer
    queryset = User.objects.all()

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserFriendDetailView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = User.objects.all()
    serializer_class = UserFriendSerializer

class UserRegisterView(APIView):
    queryset = User.objects.all()
    serializer_class = UserSignUpSerializers

    def post(self, request, *args, **kwargs):
        serializer = UserSignUpSerializers(data=request.data)
        # print("Data", request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':"User is created successfuly"}, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    