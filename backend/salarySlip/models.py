from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your models here.

class SalarySlip(models.Model):
  employee = models.ForeignKey(User, on_delete=models.CASCADE,related_name='salary_slips')
  month = models.CharField(max_length=20)
  base_salary = models.DecimalField(max_digits=10, decimal_places=2)
  bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0)
  deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)
  created_at = models.DateTimeField(auto_now_add=True)
  
  @property
  def net_salary(self):
    return self.base_salary + self.bonus - self.deductions
  
  def __str__(self):
    return f"Salary Slip for {self.employee.name} - {self.month}"
  
 
 
class Expenses(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='expenses')
  price = models.DecimalField(max_digits=10, decimal_places=2)
  description = models.TextField()
  approved = models.BooleanField(default=False)
  created_at = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return self.user.get_full_name
  
  