from django.urls import path
from .views import PetsListView, OwnersListView, OwnsListView, LikesListView, FoodsListView, PurchasesListView

urlpatterns = [
    path('pets/', PetsListView.as_view(), name='pets'),
    path('owners/', OwnersListView.as_view(), name='owners'),
    path('owns/', OwnsListView.as_view(), name='owns'),
    path('likes/', LikesListView.as_view(), name='likes'),
    path('foods/', FoodsListView.as_view(), name='foods'),
    path('purchases/', PurchasesListView.as_view(), name='purchases'),
]