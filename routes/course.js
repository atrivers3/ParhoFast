const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { verifyToken, isTeacher } = require("../middleware/authMiddleware");

router.post(
  "/create",
  verifyToken,
  isTeacher,
  courseController.createCourse
);

// to See All the Existing Courses
router.get("/", courseController.getAllCourses);

router.get("/my-courses", verifyToken, courseController.getMyCreatedCourses);

router.get("/:id/details", courseController.getCourseDetails);

router.delete("/:id", verifyToken, deleteCourse);

module.exports = router;