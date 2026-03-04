const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const enrollmentRoutes = require("./routes/enrollment");


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running... ?");
});

app.use("/api/auth/", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});