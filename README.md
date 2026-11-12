# Student Management REST API

A robust, production-ready RESTful API for managing student records, built using **Node.js**, **Express.js**, **MongoDB Atlas**, and **Mongoose**. Developed as a Web Technology college assignment following the industry-standard **MVC (Model-View-Controller)** architectural pattern.

---

## 1. Project Introduction

The **Student Management REST API** provides an automated backend service for educational institutions to create, retrieve, update, and delete student data. It implements strict validation rules, robust error handling with standardized HTTP status codes, secure database connectivity via environment variables, and automated Postman test suites.

---

## 2. Problem Statement

Traditional paper-based or unstandardized student tracking systems suffer from data redundancy, manual entry errors, lack of validation, and security vulnerabilities. Educational workflows require a secure, centralized, and standardized REST API that enforces data integrity (such as unique roll numbers and emails, bounded academic years, and standardized schema formatting) while exposing predictable JSON endpoints for frontend and mobile clients.

---

## 3. Project Objectives

- Implement complete **CRUD** (Create, Read, Update, Delete) operations adhering to REST principles.
- Enforce schema-level validations for student names, emails, roll numbers, branches, and academic years.
- Maintain unique database constraints for `email` and `rollNumber` with collision detection.
- Provide consistent JSON responses and standard HTTP status codes (`200`, `201`, `400`, `404`, `409`, `500`).
- Ensure modular code organization using the **MVC** pattern (`config`, `controllers`, `middleware`, `models`, `routes`).
- Secure all environment credentials and provide complete Postman test suites and documentation for academic evaluation.

---

## 4. Technologies Used

- **Runtime Environment**: [Node.js](https://nodejs.org/) (v18+ LTS recommended)
- **Web Framework**: [Express.js](https://expressjs.com/) (v4.21.2)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud NoSQL Database)
- **Object Data Modeling (ODM)**: [Mongoose](https://mongoosejs.com/) (v8.24.8)
- **Environment Management**: [dotenv](https://www.npmjs.com/package/dotenv)
- **CORS Handling**: [cors](https://www.npmjs.com/package/cors)
- **Development Tooling**: [nodemon](https://nodemon.io/)
- **API Testing**: [Postman](https://www.postman.com/)

---

## 5. Project Directory Structure

```text
student-management-api/
├── config/
│   └── db.js                 # MongoDB connection logic using Mongoose
├── controllers/
│   └── studentController.js  # Business logic & CRUD request handlers
├── documentation/
│   ├── API_DOCUMENTATION.md  # Detailed technical endpoint specification
│   └── SUBMISSION_CHECKLIST.md # College evaluation & viva defense checklist
├── middleware/
│   └── errorHandler.js       # JSON parsing, 404, and central error handler
├── models/
│   └── Student.js            # Mongoose schema and validation rules
├── postman/
│   └── Student_Management_API.postman_collection.json # Exportable Postman test collection
├── routes/
│   └── studentRoutes.js      # Express router mapping endpoints to controller functions
├── screenshots/
│   └── README.md             # Guide on screenshots to capture for submission report
├── .env                      # Local environment variables (PRIVATE - never commit)
├── .env.example              # Template showing required environment variables
├── .gitignore                # Excludes node_modules, .env, and system files from git
├── package.json              # Project metadata, dependencies, and npm scripts
├── package-lock.json         # Exact dependency lockfile
├── README.md                 # Primary project documentation
└── server.js                 # Application entry point
```

---

## 6. MongoDB Atlas Configuration

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Create a free-tier cluster (e.g., M0 Sandbox).
3. Under **Security > Database Access**, create a database user with read/write privileges. Note the username and password.
4. Under **Security > Network Access**, click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`) for local and cloud testing.
5. Under **Deployment > Database**, click **Connect** > **Drivers** (Node.js) and copy the connection string.
6. Format your connection string with your database name (e.g., `studentDB`):
   ```text
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/studentDB?retryWrites=true&w=majority
   ```

---

## 7. Installation Instructions

1. Clone or download the repository to your local machine:
   ```bash
   git clone https://github.com/yashrajemali07-hue/student-management-api.git
   cd student-management-api
   ```
2. Install the project dependencies:
   ```bash
   npm install
   ```
3. Set up your environment file:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and fill in your actual MongoDB Atlas connection string:
     ```env
     PORT=5001
     MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/studentDB?retryWrites=true&w=majority
     ```
     > **Note**: Port `5001` is recommended on macOS because Apple's native AirPlay Receiver uses port `5000`. On Linux or Windows, `PORT=5000` or `PORT=5001` can be used.

---

## 8. How to Run the Project

### Production Mode
```bash
npm start
```

### Development Mode (with automatic restart via nodemon)
```bash
npm run dev
```

Upon a successful launch, your terminal will display:
```text
MongoDB Connected: <cluster-host>
Server is running on port 5001
```

Open `http://localhost:5001` in your browser to verify the API health-check endpoint.

---

## 9. API Endpoints Summary

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/` | API Health Check and route directory | `200` |
| `POST` | `/api/students` | Create a new student record | `201`, `400`, `409`, `500` |
| `GET` | `/api/students` | Retrieve all students (sorted newest first) | `200`, `500` |
| `GET` | `/api/students/:id` | Retrieve a specific student by ObjectId | `200`, `400`, `404`, `500` |
| `PUT` | `/api/students/:id` | Update an existing student's details | `200`, `400`, `404`, `409`, `500` |
| `DELETE` | `/api/students/:id` | Delete a student by ObjectId | `200`, `400`, `404`, `500` |

---

## 10. Sample Requests and Responses

### A. Create Student (`POST /api/students`)
**Request Body**:
```json
{
  "studentName": "Aarav Sharma",
  "email": "aarav.sharma@college.edu",
  "rollNumber": "CS2026101",
  "branch": "Computer Science",
  "year": 3
}
```

**Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Student created successfully",
  "student": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "studentName": "Aarav Sharma",
    "email": "aarav.sharma@college.edu",
    "rollNumber": "CS2026101",
    "branch": "Computer Science",
    "year": 3,
    "createdAt": "2026-11-12T18:00:00.000Z",
    "updatedAt": "2026-11-12T18:00:00.000Z",
    "__v": 0
  }
}
```

---

### B. Retrieve All Students (`GET /api/students`)
**Response (`200 OK`)**:
```json
{
  "success": true,
  "count": 1,
  "students": [
    {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "studentName": "Aarav Sharma",
      "email": "aarav.sharma@college.edu",
      "rollNumber": "CS2026101",
      "branch": "Computer Science",
      "year": 3,
      "createdAt": "2026-11-12T18:00:00.000Z",
      "updatedAt": "2026-11-12T18:00:00.000Z",
      "__v": 0
    }
  ]
}
```

---

### C. Update Student (`PUT /api/students/:id`)
**Request Body**:
```json
{
  "branch": "Information Technology",
  "year": 4
}
```

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Student updated successfully",
  "student": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "studentName": "Aarav Sharma",
    "email": "aarav.sharma@college.edu",
    "rollNumber": "CS2026101",
    "branch": "Information Technology",
    "year": 4,
    "createdAt": "2026-11-12T18:00:00.000Z",
    "updatedAt": "2026-11-12T18:15:00.000Z",
    "__v": 0
  }
}
```

---

### D. Delete Student (`DELETE /api/students/:id`)
**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "student": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "studentName": "Aarav Sharma",
    "email": "aarav.sharma@college.edu",
    "rollNumber": "CS2026101",
    "branch": "Information Technology",
    "year": 4
  }
}
```

---

## 11. Postman Testing Instructions

A complete, pre-configured Postman collection is located at:
`postman/Student_Management_API.postman_collection.json`

### Steps to Test:
1. Open Postman desktop or web client.
2. Click **Import** (top left) and select the file `postman/Student_Management_API.postman_collection.json`.
3. The collection provides two test suites:
   - **CRUD Operations**: Tests Create, Read All, Read by ID, Update, and Delete in sequence.
   - **Validation & Error Scenarios**: Tests missing fields, malformed email, invalid year, duplicate keys, invalid ID, and 404 routes.
4. The **Create Student** request automatically extracts the returned student `_id` and saves it into the `studentId` collection variable, allowing subsequent GET by ID, PUT, and DELETE tests to run without manual ID copying.
5. Click **Run Collection** to execute all automated test assertions.

---

## 12. GitHub Setup Instructions

1. Verify that `.gitignore` contains `.env` and `node_modules`.
2. Check git status to ensure no sensitive files are tracked:
   ```bash
   git status
   ```
3. Stage and commit changes:
   ```bash
   git add .
   git commit -m "Refactor: Student Management REST API with MVC pattern and complete documentation"
   ```
4. Create an empty repository named `student-management-api` on [GitHub](https://github.com/new).
5. Push your local repository to GitHub:
   ```bash
   git push -u origin main
   ```

---

## 13. Render Cloud Deployment Instructions

Deploying this API to [Render](https://render.com/) is straightforward:

1. Push your code to your GitHub repository.
2. Sign in to your [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** and select **Web Service**.
4. Connect your GitHub account and choose the `student-management-api` repository.
5. Configure the service settings:
   - **Name**: `student-management-api`
   - **Environment**: `Node`
   - **Region**: Closest to your location (e.g., Singapore or Frankfurt)
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
6. Scroll down to **Environment Variables** and add:
   - `MONGODB_URI`: `<Your MongoDB Atlas connection URI>`
   - `PORT`: `10000` (Render will assign this automatically, but you can specify it)
7. Click **Create Web Service**.
8. Once the build finishes and status displays **Live**, access your API using the provided URL (e.g., `https://student-management-api.onrender.com`).
