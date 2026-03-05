const express = require("express");
const { enrollCourse, getMyCourses } = require("../controllers/enrollmentController");
const { verifyToken } = require("../middleware/authMiddleware");


const router = express.Router();

// Route for course enrollment
router.post("/enroll", verifyToken, enrollCourse);

// My Enrolled Courses
router.get("/my-courses", verifyToken, getMyCourses);

module.exports = router;
