const pool = require("../config/db");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, content } = req.body;

    const newCourse = await pool.query(
      "INSERT INTO courses (title, description, content, teacher_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, content, req.user.id]
    );

    res.status(201).json(newCourse.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Return All Courses with Teacher Name
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await pool.query(`
      SELECT courses.*, users.name AS teacher_name
      FROM courses
      JOIN users ON courses.teacher_id = users.id
    `);

    res.json(courses.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// List my Created Courses
exports.getMyCreatedCourses = async (req, res) => {
  try {
    const courses = await pool.query(
      "SELECT * FROM courses WHERE teacher_id = $1",
      [req.user.id]
    );

    res.json(courses.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get COntent of Specific Course
exports.getCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await pool.query(
      "SELECT * FROM courses WHERE id = $1",
      [id]
    );

    if (course.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    const videos = await pool.query(
      "SELECT * FROM course_videos WHERE course_id = $1 ORDER BY position",
      [id]
    );

    const notes = await pool.query(
      "SELECT * FROM course_notes WHERE course_id = $1 ORDER BY position",
      [id]
    );

    res.json({
      ...course.rows[0],
      videos: videos.rows,
      notes: notes.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Course Deletion by Verifying the owner
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;  //From URL

    const course = await pool.query(
      "SELECT * FROM courses WHERE id = $1",
      [id]
    );

    if (course.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    
    // Ownership check
    if (course.rows[0].teacher_id !== req.user.id) {
      // Where does "req.user.id" come from?
      // The auth middleware intercepts the request and verifies the token.
      // If the token is valid, it decodes the token data.
      // The decoded token contains the user's ID (the user who created the token).
      // Then it assigns that decoded data to req.user.
      // So we can access the logged-in user's ID using req.user.id.
      return res.status(403).json({ message: "Not authorized" });
    }

    // "await" is used to wait for the database response.
    // Without "await", the query would execute asynchronously,
    // and the next statement would run before knowing
    // whether the query succeeded or failed.
    await pool.query("DELETE FROM courses WHERE id = $1", [id]);

    res.json({ message: "Course deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

