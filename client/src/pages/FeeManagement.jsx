import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function FeeManagement() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");

      const data = res.data.data.map((student) => ({
        ...student,
        totalFee: 50000,
        paidFee: 0,
      }));

      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const openEdit = (student) => {
    setSelectedStudent({ ...student });
  };

  const saveFee = () => {
    setStudents((prev) =>
      prev.map((student) =>
        student._id === selectedStudent._id
          ? selectedStudent
          : student
      )
    );

    toast.success("Fee updated successfully.");
    setSelectedStudent(null);
  };

  const totalFees = students.reduce(
    (sum, student) => sum + student.totalFee,
    0
  );

  const collectedFees = students.reduce(
    (sum, student) => sum + student.paidFee,
    0
  );

  const pendingFees = totalFees - collectedFees;

  return (
    <div className="container py-4">

      <h2 className="mb-4">💰 Fee Management</h2>

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h6>Total Fees</h6>
              <h2>₹{totalFees.toLocaleString()}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h6>Collected</h6>
              <h2>₹{collectedFees.toLocaleString()}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h6>Pending</h6>
              <h2>₹{pendingFees.toLocaleString()}</h2>
            </div>
          </div>
        </div>

      </div>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Total Fee</th>
            <th>Paid</th>
            <th>Remaining</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => {

            const remaining =
              student.totalFee - student.paidFee;

            let status = "Pending";

            if (remaining === 0) status = "Paid";
            else if (student.paidFee > 0) status = "Partial";

            return (

              <tr key={student._id}>

                <td>{student.name}</td>

                <td>{student.course}</td>

                <td>₹{student.totalFee}</td>

                <td>₹{student.paidFee}</td>

                <td>₹{remaining}</td>

                <td>{status}</td>

                <td>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openEdit(student)}
                  >
                    Edit
                  </button>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

      {selectedStudent && (

        <div className="card shadow mt-4">

          <div className="card-header">
            Edit Fee
          </div>

          <div className="card-body">

            <div className="mb-3">

              <label>Total Fee</label>

              <input
                type="number"
                className="form-control"
                value={selectedStudent.totalFee}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    totalFee: Number(e.target.value),
                  })
                }
              />

            </div>

            <div className="mb-3">

              <label>Paid Fee</label>

              <input
                type="number"
                className="form-control"
                value={selectedStudent.paidFee}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    paidFee: Number(e.target.value),
                  })
                }
              />

            </div>

            <button
              className="btn btn-success me-2"
              onClick={saveFee}
            >
              Save
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setSelectedStudent(null)}
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default FeeManagement;