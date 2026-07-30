import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Profile() {
  const defaultProfile = {
    name: "Admin",
    email: "admin@sms.com",
    phone: "9876543210",
    role: "Administrator",
    college: "IMS Engineering College",
    department: "Computer Science & Engineering",
    about:
      "Responsible for managing students, faculty, attendance, fees, and reports.",
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("profile");

    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    setEditing(false);
    toast.success("Profile updated successfully.");
  };

  const cancelEdit = () => {
    const saved = localStorage.getItem("profile");

    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setProfile(defaultProfile);
    }

    setEditing(false);
  };

  return (
    <div className="container py-4">

      <h2 className="mb-4">👤 Profile</h2>

      <div className="card shadow">

        <div className="card-body">

          <div className="text-center mb-4">

            <img
              src="https://ui-avatars.com/api/?name=Admin&background=0d6efd&color=fff&size=150"
              alt="Profile"
              className="rounded-circle border"
            />

          </div>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label">Name</label>

              <input
                className="form-control"
                name="name"
                value={profile.name}
                disabled={!editing}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">Email</label>

              <input
                className="form-control"
                name="email"
                value={profile.email}
                disabled={!editing}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">Phone</label>

              <input
                className="form-control"
                name="phone"
                value={profile.phone}
                disabled={!editing}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">Role</label>

              <input
                className="form-control"
                name="role"
                value={profile.role}
                disabled={!editing}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">College</label>

              <input
                className="form-control"
                name="college"
                value={profile.college}
                disabled={!editing}
                onChange={handleChange}
              />

            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label">Department</label>

              <input
                className="form-control"
                name="department"
                value={profile.department}
                disabled={!editing}
                onChange={handleChange}
              />

            </div>

            <div className="col-12 mb-3">

              <label className="form-label">About</label>

              <textarea
                rows="4"
                className="form-control"
                name="about"
                value={profile.about}
                disabled={!editing}
                onChange={handleChange}
              />

            </div>

          </div>

          {!editing ? (
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                className="btn btn-success me-2"
                onClick={saveProfile}
              >
                Save Changes
              </button>

              <button
                className="btn btn-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;