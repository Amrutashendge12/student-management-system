import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    subject: "",
    marks: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
          `http://localhost:5000/api/students?page=${page}&limit=5`
      );

      setStudents(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // add student
const addStudent = async (e) => {
  e.preventDefault();

  console.log("FORM DATA:", formData);

  // Validation
  if (!formData.name || !formData.email || !formData.age) {
    alert("Please fill all fields");
    return;
  }

  if (!formData.email.includes("@")) {
    alert("Please enter valid email");
    return;
  }

  if (formData.age < 1 || formData.age > 100) {
    alert("Please enter valid age");
    return;
  }

  if (formData.marks < 0 || formData.marks > 100) {
    alert("Marks must be between 0 and 100");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5000/api/students",
      formData
    );

    setFormData({
      name: "",
      email: "",
      age: "",
      subject: "",
      marks: "",
    });

    fetchStudents();

  } catch (error) {
    console.log(error);
  }
};

// update function
const updateStudent = async (e) => {
  e.preventDefault();

  try {
    await axios.put(
      `http://localhost:5000/api/students/${editingId}`,
      formData
    );

    setEditingId(null);

    setFormData({
      name: "",
      email: "",
      age: "",
      subject: "",
      marks: "",
    });

    fetchStudents();
  } catch (error) {
    console.log(error);
  }
};

// delete function
const deleteStudent = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/students/${id}`
    );

    fetchStudents();
  } catch (error) {
    console.log(error);
  }
};

// add marks
const viewStudent = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/students/${id}`
    );

    setSelectedStudent(res.data);

  } catch (error) {
    console.log(error);
  }
};

return (
  <div className="container mt-4">

    <h1 className="text-center mb-4 text-primary">
      Student Management System
    </h1>

<div className="row mb-3">
  <div className="col-md-12">
    <div className="card bg-primary text-white shadow">
      <div className="card-body text-center">
        <h5>Total Students</h5>
        <h2>{students.length}</h2>
      </div>
    </div>
  </div>
</div>

<div className="card shadow-lg p-4 mb-4">
  <h3 className="text-center mb-4">
    {editingId ? "Update Student" : "Add New Student"}
  </h3>

  <form
    onSubmit={
      editingId
        ? updateStudent
        : addStudent
    }
  >
    <div className="mb-3">
      
      <input
        type="text"
        name="name"
        className="form-control"
        placeholder="Enter Student Name"
        value={formData.name}
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
     
      <input
        type="email"
        name="email"
        className="form-control"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
      
      <input
        type="number"
        name="age"
        className="form-control"
        placeholder="Enter Age"
        value={formData.age}
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
        <input
          type="text"
          name="subject"
          className="form-control"
          placeholder="Enter Subject"
          value={formData.subject}
          onChange={handleChange}
        />
    </div>

    <div className="mb-3">
      <input
        type="number"
        name="marks"
        className="form-control"
        placeholder="Enter Marks"
        value={formData.marks}
        onChange={handleChange}
      />
    </div>

    <button
      type="submit"
      className={`btn w-100 ${
        editingId
          ? "btn-warning"
          : "btn-primary"
      }`}
    >
      {editingId
        ? "Update Student"
        : "Add Student"}
    </button>
  </form>
</div>

<div className="card shadow p-3 mb-4">
  <input
    type="text"
    className="form-control"
    placeholder=" 🔍 Search Student By Name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

<div className="card shadow p-3">
  <h3 className="mb-3">Student List</h3>

  <div className="table-responsive">
    <table className="table table-striped table-hover align-middle">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students
          .filter((student) =>
            student.name
            .toLowerCase()
            .includes(search.toLowerCase())
          )
        .map((student) => (

          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>

            <td>

              <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => viewStudent(student.id)}
                >
              View Marks
              </button>

              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => {
                  setEditingId(student.id);

                  setFormData({
                    name: student.name,
                    email: student.email,
                    age: student.age,
                  });
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteStudent(student.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

<div className="d-flex justify-content-center mt-3">

  <button
    className="btn btn-secondary me-2"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </button>

  <span className="mt-2">
    Page {page} of {totalPages}
  </span>

  <button
    className="btn btn-secondary ms-2"
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>

</div>

{selectedStudent && (
  <div className="card shadow p-4 mt-4">
    <h3 className="mb-3">
      Student Details
    </h3>

    <p>
      <strong>Name:</strong>{" "}
      {selectedStudent.student.name}
    </p>

    <p>
      <strong>Email:</strong>{" "}
      {selectedStudent.student.email}
    </p>

    <p>
      <strong>Age:</strong>{" "}
      {selectedStudent.student.age}
    </p>

    <h4 className="mt-4">
      Marks
    </h4>

    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Marks</th>
        </tr>
      </thead>

      <tbody>
        {selectedStudent.marks.map((mark) => (
          <tr key={mark.id}>
            <td>{mark.subject}</td>
            <td>{mark.marks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

</div>
); 
}

export default App;