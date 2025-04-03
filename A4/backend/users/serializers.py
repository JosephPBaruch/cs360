from rest_framework import serializers
from .models import Pets, Owners, Owns, Likes, Foods, Purchases

class PetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pets
        fields = '__all__'

class OwnersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owners
        fields = '__all__'

class OwnsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owns
        fields = '__all__'

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = '__all__'

class FoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields = '__all__'

class PurchasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchases
        fields = '__all__'