from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Bus, Seat, Bookings
from .serializers import (
    UserRegisterSerializer,
    BusSerializer,
    BookingSerializer,
    SeatSerializer,
    UserSerializer,
)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    'token': token.key,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'name': user.get_full_name() or user.username,
                        'email': user.email or '',
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if not user:
        return Response({'error': 'Invalid credentials'}, status=401)
    token, _ = Token.objects.get_or_create(user=user)
    return Response(
        {
            'token': token.key,
            'user_id': user.id,
            'username': user.username,
            'email': user.email or None,
        }
    )


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if request.user.id != pk:
            return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)

        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BusListCreateView(generics.ListCreateAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer


class BusDetailedView(generics.RetrieveAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer


class BusSeatsListView(generics.ListAPIView):
    serializer_class = SeatSerializer

    def get_queryset(self):
        bus_pk = self.kwargs.get('pk')
        return Seat.objects.filter(bus_id=bus_pk).order_by('seat_number')


class SeatListCreateView(generics.ListCreateAPIView):
    serializer_class = SeatSerializer

    def get_queryset(self):
        qs = Seat.objects.all().order_by('id')
        bus_pk = self.kwargs.get('pk')
        if bus_pk is not None:
            return qs.filter(bus_id=bus_pk).order_by('seat_number')
        bus_q = self.request.query_params.get('bus')
        if bus_q:
            try:
                bid = int(bus_q)
                return qs.filter(bus_id=bid).order_by('seat_number')
            except ValueError:
                pass
        return qs


class SeatDetailView(generics.RetrieveAPIView):
    queryset = Seat.objects.all()
    serializer_class = SeatSerializer


class BookingDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        booking = get_object_or_404(Bookings, pk=pk)
        if booking.user != request.user:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        seat = booking.seat
        seat.is_booked = False
        seat.save()
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        seat_id = request.data.get('seat')
        travel_date_str = request.data.get('travel_date')

        if not travel_date_str:
            return Response({'error': 'travel_date is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            travel_date = datetime.strptime(travel_date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response(
                {'error': 'travel_date must be in YYYY-MM-DD format.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not seat_id:
            return Response({'error': 'seat id is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            seat = Seat.objects.get(id=seat_id)
        except Seat.DoesNotExist:
            return Response({'error': 'Invalid seat ID.'}, status=status.HTTP_400_BAD_REQUEST)

        if seat.is_booked:
            return Response({'error': 'Seat already booked.'}, status=status.HTTP_400_BAD_REQUEST)

        seat.is_booked = True
        seat.save()

        booking = Bookings.objects.create(
            user=request.user,
            bus=seat.bus,
            seat=seat,
            travel_date=travel_date,
        )
        serializer = BookingSerializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        if request.user.id != user_id:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)

        bookings = Bookings.objects.filter(user_id=user_id)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
