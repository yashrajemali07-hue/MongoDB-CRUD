# Student Management API

A REST API built with Node.js, Express, Mongoose and MongoDB Atlas.

## Features
- Create, read all, read one, update and delete student records
- Required-field and year validation
- Unique email and roll number
- JSON responses and HTTP status codes
- Environment variables for database credentials

## Student fields
`studentName`, `email`, `rollNumber`, `branch`, `year`

## Run locally
1. Install Node.js (LTS).
2. Run `npm install`.
3. Create `.env` in the project root and add your MongoDB Atlas connection string:
   `MONGODB_URI=your_connection_string`
   `PORT=5001` (or `5000` if available)
4. Run `npm start`.
5. Open `http://localhost:5001` (or `http://localhost:5000`).

## Endpoints
| Method | URL | Purpose |
|---|---|---|
| POST | `/api/students` | Create a student |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get one student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

## Example request body
```json
{
  "studentName": "Aarav Sharma",
  "email": "aarav@example.com",
  "rollNumber": "CS2026001",
  "branch": "Computer Science",
  "year": 3
}
```

## Deploy
Push this repository to GitHub, create a Render Web Service, use `npm install` as the build command and `npm start` as the start command. Add `MONGODB_URI` in Render Environment Variables. Do not commit `.env`.
