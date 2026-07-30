import { useEffect, useState } from "react";
import API from "../services/api";

function Reports() {
  const [students, setStudents] = useState([]);

  const [faculty] = useState([
    {
      id: 1,
      name: "Dr. Raj Sharma",
      department: "CSE",
      subject: "DBMS",
    },
    {
      id: 2,
      name: "Priya Singh",
      department: "AIML",
      subject: "Machine Learning",
    },
  ]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalStudents = students.length;
  const totalFaculty = faculty.length;

  const present = Math.floor(totalStudents * 0.8);
  const absent = totalStudents - present;

  const totalFees = totalStudents * 50000;
  const collected = Math.floor(totalFees * 0.7);
  const pending = totalFees - collected;

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Course", "Age"];

    const rows = students.map((s) => [
      s.name,
      s.email,
      s.phone,
      s.course,
      s.age,
    ]);

    const csv = [headers, ...rows]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "students_report.csv";
    link.click();
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="container py-4">

      <h2 className="mb-4">📄 Reports</h2>

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h6>Total Students</h6>
              <h2>{totalStudents}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h6>Total Faculty</h6>
              <h2>{totalFaculty}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning">
            <div className="card-body text-center">
              <h6>Present</h6>
              <h2>{present}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h6>Pending Fees</h6>
              <h2>₹{pending.toLocaleString()}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="mb-3">
        <button
          className="btn btn-success me-2"
          onClick={exportCSV}
        >
          Export Student CSV
        </button>

        <button
          className="btn btn-primary"
          onClick={printReport}
        >
          Print Report
        </button>
      </div>

      <div className="card shadow mb-4">

        <div className="card-header">
          Student Report
        </div>

        <div className="table-responsive">

          <table className="table table-bordered mb-0">

            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Age</th>
              </tr>
            </thead>

            <tbody>

              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.course}</td>
                  <td>{student.age}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="card shadow mb-4">

        <div className="card-header">
          Faculty Report
        </div>

        <table className="table table-bordered mb-0">

          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Subject</th>
            </tr>
          </thead>

          <tbody>

            {faculty.map((f) => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>{f.department}</td>
                <td>{f.subject}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <div className="row">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-header">
              Attendance Summary
            </div>

            <div className="card-body">
              <p><strong>Present:</strong> {present}</p>
              <p><strong>Absent:</strong> {absent}</p>
              <p>
                <strong>Attendance %:</strong>{" "}
                {totalStudents
                  ? ((present / totalStudents) * 100).toFixed(1)
                  : 0}
                %
              </p>
            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-header">
              Fee Summary
            </div>

            <div className="card-body">
              <p><strong>Total Fees:</strong> ₹{totalFees.toLocaleString()}</p>
              <p><strong>Collected:</strong> ₹{collected.toLocaleString()}</p>
              <p><strong>Pending:</strong> ₹{pending.toLocaleString()}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;