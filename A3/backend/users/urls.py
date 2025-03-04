from django.urls import path, include
from .views import LoginView, RegisterView, LogoutView, AddedUserListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('added-users/', AddedUserListView.as_view(), name='added-users'),
]