from rest_framework import serializers
from .models import SalarySlip,Expenses

class SalarySlipSerializer(serializers.ModelSerializer):
    net_salary = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    # for creatinf slip
    employee_email = serializers.EmailField(write_only=True)
    
    # for response
    employee_name = serializers.CharField(source="employee.name", read_only=True)
    employee_email_read = serializers.CharField(source="employee.email", read_only=True)

    class Meta:
        model = SalarySlip
        fields = [
            'employee_email', # write only
            'employee_name',      # read-only
            'employee_email_read',  # read-only
            'employee',
            'month',
            'base_salary',
            'bonus',
            'deductions',
            'created_at',
            'net_salary',
        ]
        extra_kwargs = {
            "employee": {"read_only": True},
        }

    def validate(self, attrs):
        email = attrs.get("employee_email")

        from django.contrib.auth import get_user_model
        User = get_user_model()

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({
                "employee_email": "Employee with this email does not exist"
            })

        # attach user instance
        attrs["employee"] = user
        return attrs

    def create(self, validated_data):
        validated_data.pop("employee_email")
        return SalarySlip.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if "employee_email" in validated_data:
            email = validated_data.pop("employee_email")
            from django.contrib.auth import get_user_model
            User = get_user_model()
            instance.employee = User.objects.get(email=email)

        return super().update(instance, validated_data)

    def get_net_salary(self, obj):
        return obj.net_salary
  
  

class ExpensesSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Expenses
        fields = ['id', 'user', 'price', 'description', 'approved', 'created_at', 'email']
        read_only_fields = ['user', 'approved']


        
        
  
    
    
    
    