const mongoose = require("mongoose");
const Student = require("../models/Student");

// Only these fields can be created or updated
const allowedFields = ["studentName", "email", "rollNumber", "branch", "year"];

/**
 * Validate that the request body only contains recognized student fields.
 */
function hasOnlyAllowedFields(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return false;
  }
  return Object.keys(body).every((key) => allowedFields.includes(key));
}

/**
 * @desc    Create a new student
 * @route   POST /api/students
 * @access  Public
 */
const createStudent = async (req, res, next) => {
  try {
    if (!hasOnlyAllowedFields(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Request contains unsupported fields"
      });
    }

    const student = await Student.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Retrieve all students (sorted by newest first)
 * @route   GET /api/students
 * @access  Public
 */
const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      students
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Retrieve a single student by ID
 * @route   GET /api/students/:id
 * @access  Public
 */
const getStudentById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID"
      });
    }

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    return res.status(200).json({
      success: true,
      student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing student's details
 * @route   PUT /api/students/:id
 * @access  Public
 */
const updateStudent = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID"
      });
    }

    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body) ||
      Object.keys(req.body).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Request body must contain at least one field to update"
      });
    }

    if (!hasOnlyAllowedFields(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Request contains unsupported fields"
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a student by ID
 * @route   DELETE /api/students/:id
 * @access  Public
 */
const deleteStudent = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID"
      });
    }

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      student
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
