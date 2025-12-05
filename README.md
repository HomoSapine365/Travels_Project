# \#📘 \*\*Travels Project – Bus Booking Fullstack Application\*\*

# \### \*(Angular + Django REST Framework)\*

# 

# A complete \*\*bus booking system\*\* built with:

# 

# \- \*\*Angular 20\*\* (Frontend)

# \- \*\*Django 5.1 + Django REST Framework\*\* (Backend)

# \- \*\*Token Authentication\*\*

# \- \*\*SQLite Database\*\*

# 

# Users can register, log in, browse buses, view seats, select travel dates, and book/cancel tickets.

# 

# ---

# 

# \# 🚀 \*\*Features\*\*

# 

# \### 🔐 \*\*Authentication\*\*

# \- Register new users

# \- Login with token authentication

# \- Persistent session using localStorage

# \- View \& update profile

# 

# \### 🚌 \*\*Bus Features\*\*

# \- List all buses

# \- View individual bus details

# \- Display origin, destination, timings, price

# \- Show seat availability

# 

# \### 💺 \*\*Seat Booking\*\*

# \- Live seat availability status

# \- Select/unselect seats

# \- Choose travel date

# \- Confirm booking

# \- Cancel bookings

# 

# \### 👤 \*\*User Dashboard\*\*

# \- View all bookings

# \- Cancel seat reservations

# \- View user profile

# 

# ---

# 

# \# 🛠️ \*\*Tech Stack\*\*

# 

# \### \*\*Frontend (Angular)\*\*

# \- Angular 20

# \- Bootstrap 5

# \- TypeScript

# \- Angular Routing

# \- Token-based interceptor

# \- RxJS Observables

# 

# \### \*\*Backend (Django)\*\*

# \- Django 5.1

# \- Django REST Framework

# \- Token Authentication

# \- SQLite database

# \- CORS enabled for Angular

# 

# ---

# 

# \# 📁 \*\*Project Structure\*\*

# 

# ```

# Travels\_Project/

# │

# ├── FRONTEND/

# │   └── travels-frontend/      # Angular application

# │

# ├── BACKEND/

# │   ├── travels/               # Django settings, URLs, config

# │   ├── bookings/              # Models, views, serializers, urls

# │   └── manage.py

# │

# ├── output-screenshots/        # Screenshots for README (optional)

# ├── .gitignore

# └── README.md

# ```

# 

# ---

# 

# \# ⚙️ \*\*Backend Setup (Django)\*\*

# 

# \### 1. Navigate to backend

# ```cmd

# cd BACKEND

# ```

# 

# \### 2. Create virtual environment

# ```cmd

# python -m venv venv

# venv\\Scripts\\activate

# ```

# 

# \### 3. Install dependencies

# ```cmd

# pip install django djangorestframework django-cors-headers

# ```

# 

# \### 4. Apply migrations

# ```cmd

# python manage.py migrate

# ```

# 

# \### 5. Run the server

# ```cmd

# python manage.py runserver

# ```

# 

# Backend runs at:

# 

# ```

# http://127.0.0.1:8000/

# ```

# 

# ---

# 

# \# 🌐 \*\*Frontend Setup (Angular)\*\*

# 

# \### 1. Navigate to Angular project

# ```cmd

# cd FRONTEND\\travels-frontend

# ```

# 

# \### 2. Install dependencies

# ```cmd

# npm install

# ```

# 

# \### 3. Run Angular dev server

# ```cmd

# ng serve

# ```

# 

# Frontend runs at:

# 

# ```

# http://localhost:4200/

# ```

# 

# ---

# 

# \# 🔗 \*\*API Endpoints (Django REST Framework)\*\*

# 

# | Method | Endpoint | Description |

# |--------|----------|-------------|

# | POST | `/api/register/` | Create new user |

# | POST | `/api/login/` | Login \& obtain token |

# | GET | `/api/buses/` | Get all buses |

# | GET | `/api/buses/<id>/` | Get details for a bus |

# | GET | `/api/buses/<id>/seats/` | Get seats for a bus |

# | POST | `/api/booking/` | Book a seat |

# | DELETE | `/api/booking/<id>/` | Cancel booking |

# | GET | `/api/user/<id>/bookings/` | Get user bookings |

# | GET | `/api/user/<id>/` | Fetch user profile |

# 

# ---

# 

# \# 🖼️ \*\*Screenshots\*\*

# 

# \### 🟦 Home Page

# !\[Home Page](output-screenshots/home-page-screenshot.png)

# 

# \### 🔐 Login

# !\[Login](output-screenshots/login-screenshot.png)

# 

# \### 💺 Seats

# !\[Seats](output-screenshots/bus-seats-screenshot.png)

# 

# \### 👤 Profile

# !\[Profile](output-screenshots/profile-screenshot.png)

# 

# \### 📘 My Bookings

# !\[My Bookings](output-screenshots/my-bookings-screenshot.png)

# 

# ---

# 

# \# 🧱 \*\*Build Commands\*\*

# 

# \### Build Angular for Production

# ```cmd

# ng build

# ```

# 

# \### Run Django in production (if deployed)

# ```cmd

# python manage.py runserver

# ```

# 

# ---

# 

# \# 🛡️ \*\*Security \& .gitignore\*\*

# 

# This repo safely excludes:

# 

# \- `node\\\_modules/`

# \- `venv/`

# \- `dist/`

# \- `\\\_\\\_pycache\\\_\\\_/`

# \- `db.sqlite3`

# \- local environment files

# 

# ---

# 

# \# 🤝 \*\*Contributing\*\*

# 

# Pull requests are welcome.

# Open an issue first to discuss the proposed changes.

# 

# ---

# 

# \# 📄 \*\*License\*\*

# 

# You may add an MIT license if needed.

# 

# ---

# 

# \# 👨‍💻 \*\*Author\*\*

# 

# \*\*HomoSapine365\*\*

# GitHub: https://github.com/HomoSapine365

# 

# ---

