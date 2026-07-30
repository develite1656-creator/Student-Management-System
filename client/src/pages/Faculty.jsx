import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    subject: "",
    designation: "",
    experience: "",
  });
useEffect(() => {
    fetchFaculty();
}, []);

const fetchFaculty = async () => {
    try {
        const res = await API.get("/faculty");
        setFaculty(res.data.data);
    } catch (error) {
        console.log(error);
        toast.error("Failed to load faculty.");
    }
};
const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};
const clearForm = () => {
  setForm({
    name: "",
    email: "",
    phone: "",
    department: "",
    subject: "",
    designation: "",
    experience: "",
  });

  setEditingId(null);
};
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.department) {
    toast.error("Please fill all required fields.");
    return;
  }

  try {
    if (editingId) {
      await API.put(`/faculty/${editingId}`, form);
      toast.success("Faculty updated successfully.");
    } else {
      await API.post("/faculty", form);
      toast.success("Faculty added successfully.");
    }

    clearForm();
    fetchFaculty();

  } catch (error) {
    console.log(error);
    toast.error("Operation failed.");
  }
};

  const editFaculty = (item) => {
    setEditingId(item._id);
    setForm(item);
  };

  const deleteFaculty = async (id) => {
  if (!window.confirm("Delete this faculty member?")) return;

  try {
    await API.delete(`/faculty/${id}`);
    toast.success("Faculty deleted successfully.");
    fetchFaculty();
  } catch (error) {
    console.log(error);
    toast.error("Delete failed.");
  }
};

  const filteredFaculty = faculty.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">

      <h2 className="mb-4">👨‍🏫 Faculty Management</h2>

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h6>Total Faculty</h6>
              <h2>{faculty.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h6>Departments</h6>
              <h2>
                {
                  [...new Set(faculty.map((f) => f.department))].length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-warning text-dark">
            <div className="card-body text-center">
              <h6>Subjects</h6>
              <h2>
                {
                  [...new Set(faculty.map((f) => f.subject))].length
                }
              </h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card mb-4 shadow">

        <div className="card-header">
          {editingId ? "Edit Faculty" : "Add Faculty"}
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Faculty Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  className="form-control"
                  placeholder="Designation"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Experience"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                />
              </div>

            </div>

            <button className="btn btn-success me-2">
              {editingId ? "Update Faculty" : "Add Faculty"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearForm}
            >
              Clear
            </button>

          </form>

        </div>

      </div>

      <input
        className="form-control mb-3"
        placeholder="Search Faculty..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">

        <table className="table table-bordered table-hover">

          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Subject</th>
              <th>Designation</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredFaculty.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No Faculty Found
                </td>
              </tr>
            ) : (
              filteredFaculty.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.subject}</td>
                  <td>{item.designation}</td>
                  <td>{item.experience} Years</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editFaculty(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteFaculty(item._id)}
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
  );
}

export default Faculty;