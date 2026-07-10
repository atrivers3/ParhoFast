const express = require("express");
const { enrollCourse, getMyCourses, unenrollCourse } = require("../controllers/enrollmentController");
const { verifyToken } = require("../middleware/authMiddleware");


const router = express.Router();

// Route for course enrollment
router.post("/enroll", verifyToken, enrollCourse);

// Unenroll
router.delete("/unenroll/:courseId", verifyToken, unenrollCourse);

// My Enrolled Courses
router.get("/my-courses", verifyToken, getMyCourses);

module.exports = router;
