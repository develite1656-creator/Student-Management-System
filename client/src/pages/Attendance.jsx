import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markAttendance = (id, status) => {
    setAttendance({
      ...attendance,
      [id]: status,
    });
  };

  const saveAttendance = () => {
    console.log(attendance);
    toast.success("Attendance saved successfully.");
  };

  const resetAttendance = () => {
    setAttendance({});
    toast.info("Attendance reset.");
  };

  const present = Object.values(attendance).filter(
    (value) => value === "Present"
  ).length;

  const absent = Object.values(attendance).filter(
    (value) => value === "Absent"
  ).length;

  return (
    <div className="container py-4">

      <h2 className="mb-4">📅 Attendance</h2>

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h6>Present</h6>
              <h2>{present}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h6>Absent</h6>
              <h2>{absent}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h6>Total Students</h6>
              <h2>{students.length}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow">

        <div className="card-header">
          Student Attendance
        </div>

        <div className="table-responsive">

          <table className="table table-hover mb-0">

            <thead className="table-dark">

              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr key={student._id}>

                  <td>{student.name}</td>

                  <td>{student.course}</td>

                  <td>

                    {attendance[student._id] || "Not Marked"}

                  </td>

                  <td>

                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() =>
                        markAttendance(student._id, "Present")
                      }
                    >
                      Present
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        markAttendance(student._id, "Absent")
                      }
                    >
                      Absent
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="mt-4">

        <button
          className="btn btn-primary me-2"
          onClick={saveAttendance}
        >
          Save Attendance
        </button>

        <button
          className="btn btn-secondary"
          onClick={resetAttendance}
        >
          Reset
        </button>

      </div>

    </div>
  );
}

export default Attendance;