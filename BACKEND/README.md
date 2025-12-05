# 🚌 Hell & Heaven Travels – Django 5.1 Backend
REST API built with **Django 5.1** and **Django REST Framework** for the Hell & Heaven Travels bus ticket booking system.

This backend provides:
- Token-based authentication  
- User registration & login  
- Profile data  
- Bus listing  
- Seat availability  
- Booking creation  
- Booking cancellation  
- User-specific booking history  

---

## 🚀 Features

### 🔐 Authentication
- Token-based login (`/api/login/`)
- Register new users (`/api/register/`)
- Get user profile (`/api/user/<id>/`)

### 🚌 Buses & Seats
- List available buses
- View bus details
- Get all seats for a specific bus
- Real-time seat booking state (`is_booked`)

### 🎟️ Bookings
- Create booking for single seat
- Auto-mark seat as booked
- Cancel booking & auto-release seat
- View user booking history

### 🧾 DRF Architecture
- Clean `APIView` & `generics`
- Serializers for all models
- Token authentication
- Permission checks for user safety

---

## 📁 Project Structure

```
backend/
 ├── bookings/
 │   ├── models.py
 │   ├── views.py
 │   ├── serializers.py
 │   ├── urls.py
 │   ├── signals.py
 │   ├── apps.py
 │   └── migrations/
 ├── travels/
 │   ├── settings.py
 │   ├── urls.py
 │   ├── wsgi.py
 │   └── asgi.py
 ├── manage.py
 └── requirements.txt
```

---

## 🛠️ Installation & Setup

### 1️⃣ Create a virtual environment

```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
```

### 2️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

If missing, generate with:

```bash
pip freeze > requirements.txt
```

### 3️⃣ Run migrations

```bash
python manage.py migrate
```

### 4️⃣ Start the server

```bash
python manage.py runserver
```

Backend URL:

```
http://127.0.0.1:8000/
```

---

## 🔌 API Endpoints

### 🔐 Authentication
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/register/` | Register account |
| POST | `/api/login/` | Login user |
| GET | `/api/user/<id>/` | Get profile |
| GET | `/api/user/<id>/bookings/` | User bookings |

### 🚌 Bus
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/buses/` | List buses |
| GET | `/api/buses/<id>/` | Bus detail |
| GET | `/api/buses/<id>/seats/` | Seats for bus |

### 🎟️ Booking
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/booking/` | Create booking |
| DELETE | `/api/booking/<id>/` | Cancel booking |

---

## 🔑 Authentication Logic

### Login response example:

```json
{
  "token": "abcdef12345...",
  "user_id": 3,
  "username": "bravo",
  "email": "bravo@gmail.com"
}
```

Angular stores this token and sends:

```
Authorization: Token <token>
```

---

## 🧩 Technologies Used
- Django **5.1**
- Django REST Framework
- Python 3.11+
- db SQLite3
- Token Auth
- DRF Serializers & APIView

---

## 🧪 Run Tests

```bash
python manage.py test
```

---

## 📜 License
MIT License © 2025 Jayanth
