const pool = require("../config/db");

//Add Videos
exports.addVideo = async (req, res) => {
  try {
    const { courseId, title, video_url, position } = req.body;

    // 1️⃣ Check course exists
    const course = await pool.query(
      "SELECT * FROM courses WHERE id = $1",
      [courseId]
    );

    if (course.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2️⃣ Ownership check
    if (course.rows[0].teacher_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const video = await pool.query(
      `INSERT INTO course_videos 
      (course_id, title, video_url, position) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`,
      [courseId, title, video_url, position || 1]
    );

    res.status(201).json(video.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Add Notes
exports.addNote = async (req, res) => {
  try {
    const { courseId, title, content, position } = req.body;

    const course = await pool.query(
      "SELECT * FROM courses WHERE id = $1",
      [courseId]
    );

    if (course.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.rows[0].teacher_id !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const note = await pool.query(
      `INSERT INTO course_notes
      (course_id, title, content, position)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [courseId, title, content, position || 1]
    );

    res.status(201).json(note.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};