const express = require("express");
const router = express.Router();

const {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  addMarks


} = require("../controllers/studentController");

router.get("/", getStudents);
router.post("/", createStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.post("/marks", addMarks);

module.exports = router;