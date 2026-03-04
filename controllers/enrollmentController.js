const pool = require("../config/db");

exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // 1️⃣ Check if course exists
    const course = await pool.query(
      "SELECT * FROM courses WHERE id = $1",
      [courseId]
    );

    if (course.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2️⃣ Prevent teacher from enrolling in own course
    if (course.rows[0].teacher_id === req.user.id) {
      return res.status(400).json({ message: "Teacher cannot enroll in own course" });
    }

    // 3️⃣ Insert enrollment
    const enrollment = await pool.query(
      "INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *",
      [req.user.id, courseId]
    );

    res.status(201).json(enrollment.rows[0]);

  } catch (error) {

    // Handle duplicate enrollment error
    if (error.code === "23505") {
      return res.status(400).json({ message: "Already enrolled" });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};