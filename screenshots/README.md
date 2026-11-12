# Submission Screenshots Guide

This directory is designated for storing project demonstration screenshots for your college assignment submission and project report.

---

## Recommended Screenshots to Capture

| # | Filename | Description | What to Capture |
|---|---|---|---|
| 1 | `01_project_structure.png` | Project Structure in VS Code | File explorer showing `config/`, `controllers/`, `middleware/`, `models/`, `routes/`, `server.js`. |
| 2 | `02_server_start.png` | Server & Database Connection | Terminal output displaying `MongoDB Connected` and `Server is running on port 5001`. |
| 3 | `03_mongodb_atlas.png` | MongoDB Atlas Database | MongoDB Atlas web dashboard showing the `students` collection and document records. |
| 4 | `04_post_create_student.png` | POST - Create Student | Postman sending `POST /api/students` returning `201 Created` with created student object. |
| 5 | `05_get_all_students.png` | GET - Retrieve All Students | Postman sending `GET /api/students` returning `200 OK` with `count` and array of students. |
| 6 | `06_get_student_by_id.png` | GET - Retrieve by ID | Postman sending `GET /api/students/:id` returning `200 OK` with the specific student details. |
| 7 | `07_put_update_student.png` | PUT - Update Student | Postman sending `PUT /api/students/:id` returning `200 OK` with modified student attributes. |
| 8 | `08_delete_student.png` | DELETE - Remove Student | Postman sending `DELETE /api/students/:id` returning `200 OK` confirming deletion. |
| 9 | `09_validation_error.png` | Validation & Error Handling | Postman test showing `400 Bad Request` on missing fields, invalid email, or invalid year. |
| 10 | `10_duplicate_conflict.png` | Duplicate Key Handling | Postman test showing `409 Conflict` on duplicate email or roll number. |
| 11 | `11_render_live_api.png` | Cloud Deployment (Render) | Browser or Postman accessing the live Render deployed URL (e.g. `https://your-api.onrender.com`). |

---

## Instructions for Report Inclusion
- Use high-resolution captures (full window or focused modal).
- Keep credentials (e.g., MongoDB Atlas password in `.env`) blurred or hidden.
- Place all `.png` or `.jpg` files directly in this folder.

