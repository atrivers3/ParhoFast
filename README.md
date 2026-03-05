# 🚀 ParhoFast — Course Management Backend API

**ParhoFast** is a scalable RESTful API designed for an online course platform. It manages complex relationships between instructors, students, and course content using a high-performance PostgreSQL backbone.



## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **Authentication:** JSON Web Tokens (JWT)
* **Security:** bcrypt (Password Hashing)

---

## 📡 API Endpoints

### 🔐 Authentication
* `POST /api/auth/register` - Create a new account (Teacher/Student)
* `POST /api/auth/login` - Authenticate and receive JWT

### 📘 Course Management
* `GET /api/courses` - List all available courses
* `POST /api/courses` - Create a new course (**Teacher Only**)
* `PUT /api/courses/:id` - Update course details (**Owner Only**)
* `DELETE /api/courses/:id` - Delete course and all related content (**Owner Only**)

### 🎥 Course Content
* `POST /api/courses/:id/videos` - Add video lessons to a course
* `POST /api/courses/:id/notes` - Add study materials/notes to a course

### 🎓 Enrollments
* `POST /api/courses/:id/enroll` - Enroll in a course (Prevents duplicates)
* `GET /api/users/enrollments` - View all courses a student is enrolled in

---

## 🔒 Security Practices

* **Password Security:** All user passwords are encrypted using **bcrypt** before storage.
* **JWT Authorization:** Stateless authentication with configured token expiration.
* **RBAC:** Custom middleware enforces **Role-Based Access Control** (Teacher vs. Student).
* **Ownership Validation:** Strict checks ensure users can only modify/delete content they created.
* **SQL Injection Protection:** All database interactions use **parameterized queries** to prevent malicious injections.

---

## 🏗️ Architecture & Schema

The system uses a relational PostgreSQL structure to ensure data consistency with `ON DELETE CASCADE` integrity.



* **Users (1) → Courses (Many):** A teacher owns multiple courses.
* **Courses (1) → Content (Many):** One-to-many relationship for videos and notes.
* **Users (Many) ↔ Courses (Many):** Linked via the `enrollments` junction table.

---

## 🚀 Getting Started

### 1. Installation
git clone [https://github.com/yourusername/parhofast.git](https://github.com/yourusername/parhofast.git)
cd parhofast
npm install

### 2. Database Setup
Run the schema.sql file located in /db to initialize the database structure. Follow these steps in your terminal:

# A. Login to Postgres
psql -U postgres

# B. Inside psql (Create the database)
CREATE DATABASE parhofast_backend;
\q

# C. Run the schema migration
psql -U postgres -d parhofast_backend -f db/schema.sql

### 3. Environment Setup
Create a .env file in the root directory:

PORT=5000
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/parhofast_backend
JWT_SECRET=your_secret_key

🔮 Future Roadmap
[ ] Cloud Storage: AWS S3 / Cloudinary integration for file uploads.
[ ] Search: Pagination and advanced course filtering.
[ ] Tracking: Progress tracking for completed videos.

🤝 Contributing
Contributions, issues, and feature requests are welcome!
