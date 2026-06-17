const pool = require("../config/db");

const getStudents = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;

    // Max limit = 20
    const limit = Math.min(
      parseInt(req.query.limit) || 10,
      20
    );

    const offset = (page - 1) * limit;

    const totalResult = await pool.query(
      "SELECT COUNT(*) FROM students"
    );

    const totalRecords = parseInt(
      totalResult.rows[0].count
    );

    const result = await pool.query(
      "SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    res.status(200).json({
      totalRecords,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      data: result.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// GET CREATE STUDENT
const createStudent = async (req, res) => {
  try {
    console.log("BODY DATA:", req.body);

    const { name, email, age, subject, marks } = req.body;

    console.log("SUBJECT =", subject);
    console.log("MARKS =", marks);

// Required fields validation
if (!name || !email || !age) {
  return res.status(400).json({
    message: "Name, Email and Age are required"
  });
}

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({
    message: "Invalid email format"
  });
}

// Age validation
if (age < 1 || age > 100) {
  return res.status(400).json({
    message: "Age must be between 1 and 100"
  });
}

// marks validation
if (marks !== undefined && marks !== "" && (marks < 0 || marks > 100)) {
  return res.status(400).json({
    message: "Marks must be between 0 and 100"
  });
}
    
    const result = await pool.query(
      `INSERT INTO students(name, email, age)
       VALUES($1, $2, $3)
       RETURNING *`,
      [name, email, age]
    );

    const studentId = result.rows[0].id;
      // Marks insert
    if (subject && marks) {
      await pool.query(
        `INSERT INTO marks(student_id, subject, marks)
         VALUES($1,$2,$3)`,
        [studentId, subject, marks]
      );
    }
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const studentResult = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [id]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const marksResult = await pool.query(
      "SELECT * FROM marks WHERE student_id = $1",
      [id]
    );

    res.status(200).json({
      student: studentResult.rows[0],
      marks: marksResult.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

//  PUT UPDATE 
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const result = await pool.query(
      `UPDATE students
       SET name = $1,
           email = $2,
           age = $3
       WHERE id = $4
       RETURNING *`,
      [name, email, age, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// GER DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({
      message: "Student deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// MARKS MANAGEMENT
const addMarks = async (req, res) => {
  try {
    const { student_id, subject, marks } = req.body;

    const result = await pool.query(
      `INSERT INTO marks(student_id, subject, marks)
       VALUES($1,$2,$3)
       RETURNING *`,
      [student_id, subject, marks]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

module.exports = {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  addMarks

};