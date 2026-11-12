# Student Management REST API - Endpoint Documentation

Comprehensive technical documentation for all endpoints provided by the **Student Management REST API**.

---

## 1. Overview & General Conventions

- **Base URL (Local)**: `http://localhost:5001`
- **Base URL (Production)**: `https://<your-render-service>.onrender.com`
- **Content Type**: `application/json`
- **Architecture**: RESTful / MVC (Model-View-Controller)
- **Response Format**: Consistent JSON with `success` flag, `message`, and resource data.

---

## 2. Student Data Model

| Field | Type | Required | Unique | Validation Rules | Description |
|---|---|---|---|---|---|
| `_id` | ObjectId | Auto | Yes | Valid 24-character hex MongoDB ObjectId | Unique database identifier |
| `studentName` | String | Yes | No | Trimmed, non-empty | Full name of the student |
| `email` | String | Yes | Yes | Valid email format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), trimmed, lowercase | Student college/personal email |
| `rollNumber` | String | Yes | Yes | Trimmed, non-empty | Unique academic roll/registration number |
| `branch` | String | Yes | No | Trimmed, non-empty | Academic department/branch (e.g., Computer Science) |
| `year` | Number | Yes | No | Integer between 1 and 4 inclusive | Current year of study |
| `createdAt` | ISO Date | Auto | No | Managed by Mongoose timestamps | Timestamp when record was created |
| `updatedAt` | ISO Date | Auto | No | Managed by Mongoose timestamps | Timestamp when record was last updated |

---

## 3. Endpoints

### 3.1 Health Check / API Root
- **Method**: `GET`
- **Path**: `/`
- **Description**: Returns server status and lists primary available endpoints.

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Student Management REST API is running successfully!",
  "endpoints": {
    "getAllStudents": "GET /api/students",
    "createStudent": "POST /api/students",
    "getStudentById": "GET /api/students/:id",
    "updateStudent": "PUT /api/students/:id",
    "deleteStudent": "DELETE /api/students/:id"
  }
}
```

---

### 3.2 Create Student
- **Method**: `POST`
- **Path**: `/api/students`
- **Headers**: `Content-Type: application/json`
- **Description**: Validates input and persists a new student in MongoDB Atlas.

#### Request Body
```json
{
  "studentName": "Aarav Sharma",
  "email": "aarav.sharma@college.edu",
  "rollNumber": "CS2026101",
  "branch": "Computer Science",
  "year": 3
}
```

#### Responses
- **`201 Created`**: Student successfully saved.
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
- **`400 Bad Request`**: Validation failed (missing required fields, malformed email, year outside 1–4, or unsupported fields).
  ```json
  {
    "success": false,
    "message": "Year must be between 1 and 4"
  }
  ```
- **`409 Conflict`**: Email or rollNumber already exists in the database.
  ```json
  {
    "success": false,
    "message": "email already exists"
  }
  ```

---

### 3.3 Retrieve All Students
- **Method**: `GET`
- **Path**: `/api/students`
- **Description**: Returns all student records, ordered by newest first.

#### Responses
- **`200 OK`**:
  ```json
  {
    "success": true,
    "count": 2,
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

### 3.4 Retrieve Single Student by ID
- **Method**: `GET`
- **Path**: `/api/students/:id`
- **URL Parameters**: `id` - Valid 24-character hexadecimal MongoDB ObjectId.
- **Description**: Fetches one student record matching the specified `id`.

#### Responses
- **`200 OK`**: Record found.
  ```json
  {
    "success": true,
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
- **`400 Bad Request`**: Provided ID is not a valid 24-char ObjectId format.
  ```json
  {
    "success": false,
    "message": "Invalid student ID"
  }
  ```
- **`404 Not Found`**: ID is well-formed but does not match any document.
  ```json
  {
    "success": false,
    "message": "Student not found"
  }
  ```

---

### 3.5 Update Student Details
- **Method**: `PUT`
- **Path**: `/api/students/:id`
- **URL Parameters**: `id` - Valid MongoDB ObjectId.
- **Headers**: `Content-Type: application/json`
- **Description**: Updates one or more student fields with schema validation enforced.

#### Request Body (Example)
```json
{
  "branch": "Information Technology",
  "year": 4
}
```

#### Responses
- **`200 OK`**: Record updated successfully.
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
- **`400 Bad Request`**: Empty body, unsupported fields, or validation violation.
  ```json
  {
    "success": false,
    "message": "Request body must contain at least one field to update"
  }
  ```
- **`404 Not Found`**: No student matches the given ID.
  ```json
  {
    "success": false,
    "message": "Student not found"
  }
  ```
- **`409 Conflict`**: Updated email or rollNumber conflicts with another student.
  ```json
  {
    "success": false,
    "message": "email already exists"
  }
  ```

---

### 3.6 Delete Student
- **Method**: `DELETE`
- **Path**: `/api/students/:id`
- **URL Parameters**: `id` - Valid MongoDB ObjectId.
- **Description**: Removes the student document from the database permanently.

#### Responses
- **`200 OK`**: Record deleted successfully.
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
- **`400 Bad Request`**: Malformed ObjectId.
  ```json
  {
    "success": false,
    "message": "Invalid student ID"
  }
  ```
- **`404 Not Found`**: Student does not exist.
  ```json
  {
    "success": false,
    "message": "Student not found"
  }
  ```

---

## 4. HTTP Status Code Summary

| Status Code | Meaning | When Returned |
|---|---|---|
| `200 OK` | Standard success | Successful GET, PUT, or DELETE request |
| `201 Created` | Resource created | Successful POST request creating a student |
| `400 Bad Request` | Client validation error | Missing fields, bad email, bad year, invalid ObjectId, bad JSON |
| `404 Not Found` | Resource not located | Student ID not found in database, or unknown endpoint URL |
| `409 Conflict` | Duplicate key | Attempt to insert/update duplicate email or rollNumber |
| `500 Server Error` | Unexpected error | Internal server or database connection failure |

