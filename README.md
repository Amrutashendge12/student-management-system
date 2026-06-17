# Student Management System

## Project Overview

A Full Stack Student Management System developed using Node.js, PostgreSQL, and React.js. The application allows users to manage student records, marks, and perform CRUD operations with pagination support.

---

## Tech Stack

### Frontend

* React.js
* Axios
* Bootstrap
* Vite

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### API Testing

* Thunder Client

---

## Database Schema Design

The database is normalized up to Third Normal Form (3NF).

### Students Table

Stores student information such as:

* Name
* Email
* Age

### Marks Table

Stores subject-wise marks for students.

### Relationship

One Student → Many Marks

### Constraints Used

* Primary Key
* Foreign Key
* Unique Email
* NOT NULL Constraints

### Normalization

* 1NF: Atomic values
* 2NF: Student and marks separated
* 3NF: No redundant data

---

## Features

### Student Management

* Create Student
* Retrieve All Students
* Retrieve Student By ID
* Update Student
* Delete Student

### Marks Management

* Add Subject Marks
* View Student Marks

### Pagination

Supports:

* Page Number
* Limit
* Total Records
* Total Pages

### Search Functionality

* Search students by name

### Validation

* Required Fields Validation
* Email Validation
* Age Validation
* Marks Validation

---

## API Endpoints

### Student APIs

* POST /api/students
* GET /api/students
* GET /api/students/:id
* PUT /api/students/:id
* DELETE /api/students/:id

### Marks APIs

* POST /api/marks

---

## Installation

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Future Enhancements

* Authentication & Authorization
* JWT Security
* Advanced Search
* Dashboard Analytics

---

## Author

Amruta Premraj Shendge

B.Tech Computer Science and Engineering
