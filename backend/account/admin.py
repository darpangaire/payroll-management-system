
    
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Account

class AccountAdmin(UserAdmin):
    list_display = ('id','email', 'username', 'name', 'is_admin', 'is_staff','role')
    search_fields = ('email', 'username', 'name')
    readonly_fields = ('date_joined', 'last_login','role')

    ordering = ('email',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = (
        (None, {'fields': ('email', 'username', 'name', 'password','role')}),
        ('Permissions', {'fields': ('is_admin', 'is_staff', 'is_active', 'is_superadmin')}),
        ('Meta Data', {'fields': ('date_joined', 'last_login')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'name', 'password1', 'password2'),
        }),
    )
    


admin.site.register(Account, AccountAdmin)

