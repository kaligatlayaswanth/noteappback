# NotesApp

## Project Overview

NotesApp is a full-stack note-taking application built with **React** on the frontend and **Django** on the backend. The primary purpose of this project is to learn and practice the integration of React and Django, implementing authentication, user management, and CRUD operations for notes. The application provides a clean, intuitive, and responsive user interface, combined with a robust REST API backend.

---



---

## Features

* User Registration and Login with JWT authentication
* Secure token handling with refresh tokens
* Create, Read, Update, and Delete (CRUD) operations for notes
* Responsive design with clean UI components
* Navigation system with dynamic content based on user authentication status
* Protected routes to restrict access to authenticated users
* Token expiration and automatic refresh handling
* Clear separation between frontend and backend for scalability

---

## Technologies Used

### Frontend

* React (functional components, hooks)
* React Router DOM for routing and navigation
* Lucide-react for icons
* CSS (custom styling with Layout.css)

### Backend

* Django REST Framework for API creation
* JWT Authentication for secure token-based login
* PostgreSQL (or SQLite) for database management (adjustable)
* CORS middleware for frontend-backend communication
* Django Models and Serializers for data structure and validation

---

## Installation and Setup

### Prerequisites

* Node.js (v14 or above)
* Python (v3.8 or above)
* PostgreSQL (optional, can use SQLite for development)

### Backend Setup

1. Clone the repository
2. Navigate to the backend folder
3. Create a virtual environment: `python -m venv env`
4. Activate the environment:

   * Windows: `.\env\Scripts\activate`
   * Mac/Linux: `source env/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Run migrations: `python manage.py migrate`
7. Start the backend server: `python manage.py runserver`

### Frontend Setup

1. Navigate to the frontend folder
2. Install npm packages: `npm install`
3. Start the React development server: `npm start`

---

## Usage

* Open the React frontend in your browser (usually at `http://localhost:3000`)
* Register a new account or login with existing credentials
* Create new notes, edit or delete them
* Use navigation links to explore Profile, Login, Register pages
* Logout to clear authentication and return to the login page

---

## Project Structure

```
root/
├── backend/
│   ├── manage.py
│   ├── notesapp/
│   ├── api/
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore
```

---

## Authentication Flow

* Uses JWT access and refresh tokens stored in localStorage
* On login, tokens are saved and used for protected API requests
* Tokens are checked for expiry; refresh token is used to get a new access token automatically
* Protected routes in React restrict unauthorized access and redirect to login

---
