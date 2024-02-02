from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=600)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    