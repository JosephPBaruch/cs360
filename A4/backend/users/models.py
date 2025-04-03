from django.db import models

class Pets(models.Model):
    PetID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Age = models.IntegerField()
    Street = models.CharField(max_length=255)
    City = models.CharField(max_length=255)
    ZipCode = models.CharField(max_length=10)
    State = models.CharField(max_length=50)
    TypeofPet = models.CharField(max_length=50)

class Owners(models.Model):
    OID = models.AutoField(primary_key=True)
    LastName = models.CharField(max_length=255)
    Street = models.CharField(max_length=255)
    City = models.CharField(max_length=255)
    ZipCode = models.CharField(max_length=10)
    State = models.CharField(max_length=50)
    Age = models.IntegerField()
    AnnualIncome = models.DecimalField(max_digits=10, decimal_places=2)

class Owns(models.Model):
    PetID = models.ForeignKey(Pets, on_delete=models.CASCADE)
    Year = models.IntegerField()
    OID = models.ForeignKey(Owners, on_delete=models.CASCADE)
    PetAgeatOwnership = models.IntegerField()
    PricePaid = models.DecimalField(max_digits=10, decimal_places=2)

class Likes(models.Model):
    PetID = models.ForeignKey(Pets, on_delete=models.CASCADE)
    TypeofFood = models.CharField(max_length=50)

class Foods(models.Model):
    FoodID = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Brand = models.CharField(max_length=255)
    TypeofFood = models.CharField(max_length=50)
    Price = models.DecimalField(max_digits=10, decimal_places=2)
    ItemWeight = models.DecimalField(max_digits=5, decimal_places=2)
    ClassofFood = models.CharField(max_length=50)

class Purchases(models.Model):
    OID = models.ForeignKey(Owners, on_delete=models.CASCADE)
    FoodID = models.ForeignKey(Foods, on_delete=models.CASCADE)
    PetID = models.ForeignKey(Pets, on_delete=models.CASCADE)
    Month = models.IntegerField()
    Year = models.IntegerField()
    Quantity = models.IntegerField()


