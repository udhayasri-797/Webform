# SkillPath - Skill Recommendation System

## Design Studio Laboratory

### Focus Areas

- UI/UX Design
- Web Forms
- JavaScript
- REST APIs
- Backend Logic
- Human-Centered Design

---

## Objective

To design and develop a user-friendly web form that collects
user career preferences and provides personalized skill
recommendations through a backend REST API.

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### API

- REST API
- JSON

---

## Features

1. Responsive UI
2. User-friendly form
3. Form validation
4. Career interest selection
5. Skill-level selection
6. Backend processing
7. REST API integration
8. Personalized recommendations
9. Dynamic result display
10. Responsive mobile design

---

## API Endpoints

### Health Check

GET

/api/health

---

### Generate Recommendation

POST

/api/recommend

Example request:

{
    "name": "Udhayasri",
    "email": "udhayasri@gmail.com",
    "department": "Computer Science",
    "interest": "Web Development",
    "skillLevel": "beginner",
    "careerGoal": "Become a full-stack developer"
}

---

### Get All Submissions

GET

/api/submissions

---

### Get Specific Submission

GET

/api/submissions/:id

---

## How to Run

Install dependencies:

npm install

Start server:

npm start

Open:

http://localhost:3000

---

## Design Approach

The system follows a human-centered design approach.

### Step 1 - Understand

Identify the user's career and learning needs.

### Step 2 - Define

Collect information about interests,
skill level and career goals.

### Step 3 - Design

Create a simple and accessible web form.

### Step 4 - Develop

Connect the frontend with a REST API.

### Step 5 - Test

Validate the form and API responses.

### Step 6 - Improve

Use feedback to improve usability.