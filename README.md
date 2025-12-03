Online Lecture Scheduling Module

A comprehensive MERN Stack application for managing educational schedules, courses, and instructors with intelligent conflict detection.

📖 Overview

This project is a full-stack Lecture Scheduling System designed to streamline the academic planning process for educational institutes. It features a dual-panel architecture (Admin & Instructor) and includes a robust backend algorithm that automatically prevents scheduling conflicts—ensuring no instructor is assigned two lectures on the same date.

Live Demo:

Video Walkthrough: 

✨ Key Features

🛡️ For Admins (Command Center)

Course Management: Create courses with details like Level (Beginner/Intermediate/Advanced), Description, and Cover Image.

Instructor Management: View the complete list of available instructors.

Intelligent Scheduling: Assign lectures to instructors.

Conflict Guard™: The system automatically rejects assignments if an instructor is already booked for the selected date.

👨‍🏫 For Instructors

Personalized Dashboard: View all upcoming assigned lectures in a clean, calendar-like interface.

Role-Based Access: Secure login ensures instructors only see their own data.

🎨 UI/UX

Modern Design: Built with Tailwind CSS and Framer Motion for smooth animations and a glassmorphism aesthetic.

Responsive: Fully optimized for mobile, tablet, and desktop.

🛠️ Tech Stack

Component

Technology

Frontend

React (Vite/CRA), TypeScript, Tailwind CSS, Framer Motion, Axios, Lucide React

Backend

Node.js, Express.js

Database

MongoDB (Atlas)

Authentication

JWT (JSON Web Tokens), BCrypt.js

🚀 Getting Started

Follow these instructions to set up the project locally.

Prerequisites

Node.js (v14 or higher)

MongoDB Atlas Connection String

1. Clone the Repository

git clone [https://github.com/your-username/lecture-scheduler.git](https://github.com/your-username/lecture-scheduler.git)
cd lecture-scheduler


2. Backend Setup

Navigate to the server folder and install dependencies.

cd server
npm install


Create a .env file in the server directory:

PORT=3000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_key_here


Start the Backend Server:

node server.js


Server will run on http://localhost:3000

3. Frontend Setup

Open a new terminal, navigate to the client folder, and install dependencies.

cd client
npm install


Start the React Application:

npm start


Client will run on http://localhost:5173 (or 3000 depending on setup)

🔐 Login Credentials

You can register new users via the /register page, but here are the default roles for testing:

Role

Username

Default Password

Access

Admin

admin

123456

Full Control (Add Courses, Schedule)

Instructor

rahul

123456

View Only (My Schedule)

Note: Please register a new Admin user to populate the database if these do not exist in your fresh instance.

📡 API Documentation

Authentication

Method

Endpoint

Description

POST

/api/auth/register

Register a new user (Admin or Instructor)

POST

/api/auth/login

Login and receive JWT Token

Admin Routes (Protected)

Method

Endpoint

Description

GET

/api/admin/instructors

Fetch list of all instructors

GET

/api/admin/courses

Fetch list of all created courses

POST

/api/admin/add-course

Create a new course

POST

/api/admin/assign-lecture

(Critical) Assign a lecture. Returns 400 if conflict detected.

Instructor Routes (Protected)

Method

Endpoint

Description

GET

/api/instructor/my-lectures

Fetch lectures assigned to the logged-in user

📸 Screenshots

1. Landing Page

(Add a screenshot of your Home page here)

2. Admin Dashboard

(Add a screenshot of the Admin Panel here)

3. Conflict Error Message

(Add a screenshot showing the red error message when double-booking)

👤 Author

Atharva Sonnis