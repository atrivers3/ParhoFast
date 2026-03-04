const pool = require("../config/db");

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