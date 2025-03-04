from django.urls import path, re_path
from .views import LoginView, RegisterView, LogoutView, AddedUserListView, AddedUserCreateView, AddedUserDeleteView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('added-users/', AddedUserListView.as_view(), name='added-users'),
    path('added-users/create/', AddedUserCreateView.as_view(), name='create-added-user'),
    re_path(r'^added-users/(?P<pk>[0-9a-f-]+)/$', AddedUserDeleteView.as_view(), name='delete-added-user'),

]