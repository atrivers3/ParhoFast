const express = require("express");
const { enrollCourse } = require("../controllers/enrollmentController");
const { verifyToken } = require("../middleware/authMiddleware");


const router = express.Router();

// Route for course enrollment
router.post("/enroll", verifyToken, enrollCourse);

module.exports = router;
