import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    age: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Name Validation
    if (!student.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(student.email)) {
      toast.error("Enter a valid email address.");
      return;
    }

    // Phone Validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(student.phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    // Course Validation
    if (!student.course.trim()) {
      toast.error("Course is required.");
      return;
    }

    // Age Validation
    if (!student.age || Number(student.age) <= 0) {
      toast.error("Age must be greater than 0.");
      return;
    }

    try {
      await API.post("/students", student);

      toast.success("Student added successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Add Student
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Name</label>

            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name"
              value={student.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter Email"
              value={student.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>

            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Enter Phone Number"
              value={student.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Course</label>

            <input
              type="text"
              className="form-control"
              name="course"
              placeholder="Enter Course"
              value={student.course}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>

            <input
              type="number"
              className="form-control"
              name="age"
              placeholder="Enter Age"
              value={student.age}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Add Student
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddStudent;