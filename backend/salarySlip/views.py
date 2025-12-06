from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from .serializers import SalarySlipSerializer,ExpensesSerializers
from rest_framework.response import Response
from rest_framework import status,permissions
from .models import SalarySlip

# Create your views here.

# small permission helper
class SalarySlipView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, post_id=None):
        # 1) GET one slip
        if post_id is not None:
            slip = get_object_or_404(SalarySlip, id=post_id)

            # employee can't see others slips
            if request.user.role != "admin" and slip.employee != request.user:
                return Response(
                    {"detail": "Not allowed"},
                    status=status.HTTP_403_FORBIDDEN
                )

            serializer = SalarySlipSerializer(slip)
            return Response(serializer.data, status=200)

        # 2) GET all slips
        if request.user.role == "admin":
            slips = SalarySlip.objects.all()
        else:
            slips = SalarySlip.objects.filter(employee=request.user)

        serializer = SalarySlipSerializer(slips, many=True)
        return Response(serializer.data, status=200)

    def post(self, request):
        serializer = SalarySlipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def put(self, request, post_id):
        if request.user.role != "admin":
            return Response({"detail": "Only admin can update salary slips."},
                            status=403)

        slip = get_object_or_404(SalarySlip, id=post_id)
        serializer = SalarySlipSerializer(slip, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)

        return Response(serializer.errors, status=400)


class ExpensesView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self,request):
        serializer = ExpensesSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors,status=400)
    
    