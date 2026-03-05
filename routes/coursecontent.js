const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const courseContentController = require("../controllers/courseContentController");

router.post("/video", verifyToken, courseContentController.addVideo);
router.post("/note", verifyToken, courseContentController.addNote);

module.exports = router;