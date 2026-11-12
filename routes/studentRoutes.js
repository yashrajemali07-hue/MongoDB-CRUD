const express = require("express");
const mongoose = require("mongoose");
const Student = require("../models/Student");

const router = express.Router();

const allowedFields = ["studentName", "email", "rollNumber", "branch", "year"];

function hasOnlyAllowedFields(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return false;
  }
  return Object.keys(body).every((key) => allowedFields.includes(key));
}

// CREATE: POST /api/students
router.post("/", async (req, res) => {
  try {
    if (!hasOnlyAllowedFields(req.body)) {
      return res.status(400).json({ message: "Request contains unsupported fields" });
    }

    const student = await Student.create(req.body);
    return res.status(201).json({
      message: "Student created successfully",
      student
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      return res.status(409).json({ message: `${field} already exists` });
    }
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to create student" });
  }
});

// READ ALL: GET /api/students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).json({
      count: students.length,
      students
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve students" });
  }
});

// READ ONE: GET /api/students/:id
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({ student });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    return res.status(500).json({ message: "Failed to retrieve student" });
  }
});

// UPDATE: PUT /api/students/:id
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body) || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body must contain at least one field to update" });
    }
    if (!hasOnlyAllowedFields(req.body)) {
      return res.status(400).json({ message: "Request contains unsupported fields" });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      return res.status(409).json({ message: `${field} already exists` });
    }
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to update student" });
  }
});

// DELETE: DELETE /api/students/:id
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student deleted successfully",
      student
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    return res.status(500).json({ message: "Failed to delete student" });
  }
});

module.exports = router;
