from django.urls import path

from .views import SalarySlipView

urlpatterns = [
  path('api/', SalarySlipView.as_view()), # list and create salary slips
  path('api/<int:post_id>/', SalarySlipView.as_view()), # update
  
]

