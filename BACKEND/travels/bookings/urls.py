from django.urls import path
from .views import (
    RegisterView,
    login_view,
    BusListCreateView,
    BusDetailedView,
    BusSeatsListView,
    SeatListCreateView,
    SeatDetailView,
    BookingView,
    BookingDetailView,
    UserBookingView,
    UserDetailView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login_view, name='login'),

    path('buses/', BusListCreateView.as_view(), name='bus-list'),
    path('buses/<int:pk>/', BusDetailedView.as_view(), name='bus-detail'),
    path('buses/<int:pk>/seats/', BusSeatsListView.as_view(), name='bus-seats'),

    path('seats/', SeatListCreateView.as_view(), name='seat-list'),
    path('seats/<int:pk>/', SeatDetailView.as_view(), name='seat-detail'),

    path('booking/', BookingView.as_view(), name='booking'),
    path('booking/<int:pk>/', BookingDetailView.as_view(), name='booking-detail'),

    path('user/<int:user_id>/bookings/', UserBookingView.as_view(), name='user-bookings'),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
