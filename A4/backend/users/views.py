from rest_framework import generics
from .models import Pets, Owners, Owns, Likes, Foods, Purchases
from .serializers import PetsSerializer, OwnersSerializer, OwnsSerializer, LikesSerializer, FoodsSerializer, PurchasesSerializer

class PetsListView(generics.ListCreateAPIView):
    queryset = Pets.objects.all()
    serializer_class = PetsSerializer

class OwnersListView(generics.ListCreateAPIView):
    queryset = Owners.objects.all()
    serializer_class = OwnersSerializer

class OwnsListView(generics.ListCreateAPIView):
    queryset = Owns.objects.all()
    serializer_class = OwnsSerializer

class LikesListView(generics.ListCreateAPIView):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer

class FoodsListView(generics.ListCreateAPIView):
    queryset = Foods.objects.all()
    serializer_class = FoodsSerializer

class PurchasesListView(generics.ListCreateAPIView):
    queryset = Purchases.objects.all()
    serializer_class = PurchasesSerializer