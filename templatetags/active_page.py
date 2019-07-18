from django import template
from django.urls import resolve
from django.urls import Resolver404


register = template.Library()

@register.simple_tag
def active_page(request, view_names):
    views = view_names.split(',')
    if not request:
        return ""
    try:
        return "active" if resolve(request.path_info).url_name in views else ""
    except Resolver404:
        return ""
