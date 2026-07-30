import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    age: "",
  });

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/students/${id}`);
      setStudent(res.data.data);

    } catch (error) {
      console.error(error);

      toast.error("Unable to load student details.");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } finally {
      setLoading(false);
    }
  };

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
      await API.put(`/students/${id}`, student);

      toast.success("Student updated successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <h4 className="mt-3">
          Loading Student...
        </h4>

      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Edit Student
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Name
            </label>

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
            <label className="form-label">
              Email
            </label>

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
            <label className="form-label">
              Phone
            </label>

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
            <label className="form-label">
              Course
            </label>

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
            <label className="form-label">
              Age
            </label>

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
            className="btn btn-primary w-100"
          >
            Update Student
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditStudent;