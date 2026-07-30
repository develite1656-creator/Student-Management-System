import { useEffect, useState } from "react";
import API from "../services/api";

function Analytics() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalStudents = students.length;

  const averageAge =
    totalStudents > 0
      ? (
          students.reduce((sum, student) => sum + Number(student.age), 0) /
          totalStudents
        ).toFixed(1)
      : 0;

  const youngestStudent =
    totalStudents > 0
      ? Math.min(...students.map((student) => Number(student.age)))
      : 0;

  const oldestStudent =
    totalStudents > 0
      ? Math.max(...students.map((student) => Number(student.age)))
      : 0;

  const courseCounts = {};

  students.forEach((student) => {
    courseCounts[student.course] =
      (courseCounts[student.course] || 0) + 1;
  });

  return (
    <div className="container py-4">

      <h2 className="mb-4 fw-bold">
        📈 Student Analytics Dashboard
      </h2>

      <div className="row">

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h6>Total Students</h6>
              <h2>{totalStudents}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h6>Average Age</h6>
              <h2>{averageAge}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card bg-warning shadow">
            <div className="card-body text-center">
              <h6>Youngest</h6>
              <h2>{youngestStudent}</h2>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h6>Oldest</h6>
              <h2>{oldestStudent}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow mt-4">

        <div className="card-header bg-white">
          <h5 className="mb-0">
            Students Per Course
          </h5>
        </div>

        <div className="card-body">

          {Object.keys(courseCounts).length === 0 ? (

            <p className="text-muted">
              No student data available.
            </p>

          ) : (

            Object.entries(courseCounts).map(([course, count]) => (

              <div key={course} className="mb-4">

                <div className="d-flex justify-content-between">

                  <strong>{course}</strong>

                  <span>{count} Students</span>

                </div>

                <div className="progress mt-2">

                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{
                      width: `${(count / totalStudents) * 100}%`,
                    }}
                  >
                    {Math.round((count / totalStudents) * 100)}%
                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      <div className="card shadow mt-4">

        <div className="card-header bg-white">
          <h5 className="mb-0">
            Student Summary
          </h5>
        </div>

        <div className="card-body">

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th>Total Students</th>
                <td>{totalStudents}</td>
              </tr>

              <tr>
                <th>Average Age</th>
                <td>{averageAge}</td>
              </tr>

              <tr>
                <th>Youngest Student</th>
                <td>{youngestStudent}</td>
              </tr>

              <tr>
                <th>Oldest Student</th>
                <td>{oldestStudent}</td>
              </tr>

              <tr>
                <th>Total Courses</th>
                <td>{Object.keys(courseCounts).length}</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Analytics;