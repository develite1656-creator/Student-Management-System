import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function Home() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await API.get("/students");
      setStudents(res.data.data);

    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await API.delete(`/students/${id}`);
      toast.success("Student deleted successfully.");
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete student.");
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.phone.toLowerCase().includes(search.toLowerCase()) ||
    student.course.toLowerCase().includes(search.toLowerCase()) ||
    String(student.age).includes(search)
  );

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <h4 className="mt-3">Loading Students...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5">
<div className="row mb-4">

  <div className="col-lg-3 col-md-6 mb-3">
    <div className="card bg-primary text-white shadow">
      <div className="card-body text-center">
        <h6>Total Students</h6>
        <h2>{students.length}</h2>
      </div>
    </div>
  </div>

  <div className="col-lg-3 col-md-6 mb-3">
    <div className="card bg-success text-white shadow">
      <div className="card-body text-center">
        <h6>Departments</h6>
        <h2>5</h2>
      </div>
    </div>
  </div>

  <div className="col-lg-3 col-md-6 mb-3">
    <div className="card bg-warning text-dark shadow">
      <div className="card-body text-center">
        <h6>Faculty</h6>
        <h2>12</h2>
      </div>
    </div>
  </div>

  <div className="col-lg-3 col-md-6 mb-3">
    <div className="card bg-danger text-white shadow">
      <div className="card-body text-center">
        <h6>Courses</h6>
        <h2>4</h2>
      </div>
    </div>
  </div>

</div>
<div className="row mb-4">

  <div className="col-lg-8">

    <div className="card shadow h-100">

      <div className="card-header bg-white">
        <h5 className="mb-0">Quick Actions</h5>
      </div>

      <div className="card-body">

        <Link to="/add" className="btn btn-primary me-2 mb-2">
          ➕ Add Student
        </Link>

        <button className="btn btn-success me-2 mb-2">
          📊 Generate Report
        </button>

        <button className="btn btn-warning mb-2">
          📈 View Analytics
        </button>

      </div>

    </div>

  </div>

  <div className="col-lg-4">

    <div className="card shadow h-100">

      <div className="card-header bg-white">
        <h5 className="mb-0">Recent Activity</h5>
      </div>

      <ul className="list-group list-group-flush">

        <li className="list-group-item">
          ✅ Dashboard Loaded
        </li>

        <li className="list-group-item">
          👨‍🎓 Student Management Active
        </li>

        <li className="list-group-item">
          📂 Database Connected
        </li>

        <li className="list-group-item">
          🔄 CRUD Operations Ready
        </li>

      </ul>

    </div>

  </div>

</div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
  <h2 className="fw-bold mb-0">Students</h2>
  <small className="text-muted">
    Manage student records
  </small>
</div>

        <Link to="/add" className="btn btn-primary">
          Add Student
        </Link>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control shadow-sm rounded-3"
          placeholder="Search by Name, Email, Phone, Course or Age..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card shadow">

  <div className="card-header bg-white">
    <h5 className="mb-0">Student Records</h5>
  </div>

  <div className="table-responsive">

    <table className="table table-hover table-striped mb-0">

        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Age</th>
            <th width="180">Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredStudents.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                className="text-center text-danger fw-bold"
              >
                No Students Found
              </td>
            </tr>

          ) : (

            filteredStudents.map((student) => (

              <tr key={student._id}>

                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.course}</td>
                <td>{student.age}</td>

                <td>

                  <Link
                    to={`/edit/${student._id}`}
                    className="btn btn-outline-primary btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

</table>

  </div>

</div>

</div>

  );
}

export default Home;