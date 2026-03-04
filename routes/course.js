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

module.exports = router;