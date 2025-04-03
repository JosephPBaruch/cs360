from django.urls import path
from .views import (
    PetsListView, OwnersListView, OwnsListView, LikesListView, FoodsListView, PurchasesListView,
    PetsDeleteView, OwnersDeleteView, OwnsDeleteView, LikesDeleteView, FoodsDeleteView, PurchasesDeleteView,
    PetsUpdateView, OwnersUpdateView, OwnsUpdateView, LikesUpdateView, FoodsUpdateView, PurchasesUpdateView
)

urlpatterns = [
    path('pets/', PetsListView.as_view(), name='pets'),
    path('owners/', OwnersListView.as_view(), name='owners'),
    path('owns/', OwnsListView.as_view(), name='owns'),
    path('likes/', LikesListView.as_view(), name='likes'),
    path('foods/', FoodsListView.as_view(), name='foods'),
    path('purchases/', PurchasesListView.as_view(), name='purchases'),
    path('pets/<int:pk>/', PetsDeleteView.as_view(), name='delete-pet'),
    path('owners/<int:pk>/', OwnersDeleteView.as_view(), name='delete-owner'),
    path('owns/<int:pk>/', OwnsDeleteView.as_view(), name='delete-own'),
    path('likes/<int:pk>/', LikesDeleteView.as_view(), name='delete-like'),
    path('foods/<int:pk>/', FoodsDeleteView.as_view(), name='delete-food'),
    path('purchases/<int:pk>/', PurchasesDeleteView.as_view(), name='delete-purchase'),
    path('pets/<int:pk>/update/', PetsUpdateView.as_view(), name='update-pet'),
    path('owners/<int:pk>/update/', OwnersUpdateView.as_view(), name='update-owner'),
    path('owns/<int:pk>/update/', OwnsUpdateView.as_view(), name='update-own'),
    path('likes/<int:pk>/update/', LikesUpdateView.as_view(), name='update-like'),
    path('foods/<int:pk>/update/', FoodsUpdateView.as_view(), name='update-food'),
    path('purchases/<int:pk>/update/', PurchasesUpdateView.as_view(), name='update-purchase'),
]