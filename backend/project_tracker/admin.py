from django.contrib import admin
from .models import Project, User



class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "description","start_date","end_date","completed")
    

admin.site.register(Project, ProjectAdmin)
admin.site.register(User)


