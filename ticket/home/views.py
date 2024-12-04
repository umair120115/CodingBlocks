from django.shortcuts import render
from .serializers import UserSerializer,MovieSerializer,TicketSerializer
from .models import AppUser,Movies,Ticket
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.parsers import MultiPartParser,FormParser
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.decorators import api_view,permission_classes
# Create your views here.
class UserView(generics.ListCreateAPIView):
    queryset=AppUser.objects.all()
    permission_classes=[AllowAny]
    parser_classes=[MultiPartParser,FormParser]
    serializer_class=UserSerializer


class MovieFilter(django_filters.FilterSet):
    # Define fields to filter on, e.g., filtering by username or email
    date = django_filters.CharFilter(lookup_expr='icontains')
    movie = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Movies
        fields = ['movie', 'date'] 
class MovieView(generics.ListAPIView):
    queryset=Movies.objects.all()
    serializer_class=MovieSerializer
    parser_classes=[MultiPartParser,FormParser]
    permission_classes=[AllowAny]
    filter_backends = [DjangoFilterBackend]  # Adding DjangoFilterBackend
    filterset_class = MovieFilter  # Specifying the filter class
    

class TicketView(generics.ListCreateAPIView):
    queryset=Ticket.objects.all()
    permission_classes=[IsAuthenticated]
    parser_classes=[MultiPartParser,FormParser]
    serializer_class=TicketSerializer


@csrf_exempt
def get_booked_seats(request, movie_id):
    try:
        movie = Movies.objects.get(id=movie_id)
        booked_seats = movie.booked_seats  # List of booked seat numbers
        return JsonResponse({"booked_seats": booked_seats})
    except Movies.DoesNotExist:
        return JsonResponse({"error": "Movie not found"}, status=404)

@csrf_exempt
def save_booking(request):
    if request.method == "POST":
        data = json.loads(request.body)
        movie_id = data.get("movie_id")
        user_email = data.get("email")
        seats = data.get("seats")
        amount = data.get("amount")

        try:
            movie = Movies.objects.get(id=movie_id)
            booked_seats = set(movie.booked_seats)

            # Check if any of the selected seats are already booked
            if any(seat in booked_seats for seat in seats):
                return JsonResponse({"error": "One or more seats are already booked."}, status=400)

            # Update booked seats
            movie.booked_seats.extend(seats)
            movie.save()

            # Save ticket
            ticket = Ticket.objects.create(
                movie=movie,
                person=AppUser.objects.get(email=user_email),
                seats={"seats": seats},
                payment=True,  # Set payment to True after successful payment
                total=amount,
            )

            # Send confirmation email (you can use Django's send_mail function)
            # send_mail(
            #     "Booking Confirmation",
            #     f"Your seats {seats} for {movie.movie} have been booked successfully!",
            #     "your_email@example.com",  # Replace with your email
            #     [user_email],
            # )

            return JsonResponse({"success": "Booking confirmed."})
        except Movies.DoesNotExist:
            return JsonResponse({"error": "Movie not found"}, status=404)
        except AppUser.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

