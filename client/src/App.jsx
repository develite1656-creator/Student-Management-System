import { Routes, Route, Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import FeeManagement from "./pages/FeeManagement";
import Attendance from "./pages/Attendance";
import Faculty from "./pages/Faculty";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
function Sidebar() {
  const location = useLocation();

const menu = [
  { name: "🏠 Dashboard", path: "/" },
{ name: "👨‍🎓 Students", path: "/students" },
  { name: "➕ Add Student", path: "/add" },
  { name: "👨‍🏫 Faculty", path: "/faculty" },
  { name: "💰 Fee Management", path: "/fees" },
  { name: "📊 Reports", path: "/reports" },
  { name: "📈 Analytics", path: "/analytics" },
  { name: "⚙ Settings", path: "/settings" },
  { name: "📅 Attendance", path: "/attendance" },
  { name: "ℹ About", path: "/about" },
  { name: "🔔 Notifications", path: "/notifications" },
  { name: "👤 Profile", path: "/profile" },
];
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="text-center mb-4">
        🎓 Student Management System
      </h3>

      {menu.map((item) => (
        <Link
          key={item.path}
          to={item.path}
         className={`sidebar-link d-block text-decoration-none mb-2 p-2 rounded ${
            location.pathname === item.path
              ? "bg-primary text-white"
              : "text-light"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
function Notifications() {
  return (
    <div className="container py-4">
      <h2>🔔 Notifications</h2>

      <div className="card shadow p-4">
        <ul className="list-group">
          <li className="list-group-item">No new notifications</li>
        </ul>
      </div>
    </div>
  );
}


function Settings() {
  return (
    <div className="container py-4">
      <h2>⚙ Settings</h2>

      <div className="card shadow p-4 mt-3">
        <p>Theme : Default</p>
        <p>Notifications : Enabled</p>
        <p>Database : Connected</p>
        <p>Version : 1.0</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="container py-4">
      <h2>ℹ About</h2>

      <div className="card shadow p-4 mt-3">
        <h4>Student Management System</h4>

        <hr />

        <p>
          Final Internship Project
        </p>

        <p>
          Developer:
          <br />
          Dev Krishna Yadav
        </p>

        <p>
          MERN Stack Application
        </p>

        <p>
          React • Express • MongoDB • Bootstrap
        </p>
      </div>
    </div>
  );
}





function App() {
  return (
    <>
      <div className="d-flex">

        <Sidebar />

        <div className="flex-grow-1 bg-light">

          <div
  className="bg-white shadow-sm px-4 py-3 d-flex justify-content-between align-items-center"
>
  <div>
    <h3 className="text-primary fw-bold m-0">
      Student Management Dashboard
    </h3>

    <small className="text-muted">
      Welcome back, Administrator
    </small>
  </div>

  <div className="d-flex align-items-center">

    <input
      className="form-control me-3"
      placeholder="Search..."
      style={{ width: "250px" }}
    />

    <button className="btn btn-outline-primary me-2">
      🔔
    </button>

    <button className="btn btn-outline-secondary me-3">
      ⚙
    </button>

    <div className="text-end">
      <strong>Dev Krishna Yadav</strong>
      <br />
      <small className="text-muted">
        Administrator
      </small>
    </div>

  </div>
</div>

          <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/add" element={<AddStudent />} />
  <Route path="/edit/:id" element={<EditStudent />} />

  <Route path="/faculty" element={<Faculty />} />
  <Route path="/fees" element={<FeeManagement />} />
  <Route path="/reports" element={<Reports />} />
 <Route path="/analytics" element={<Analytics />} />
  <Route path="/attendance" element={<Attendance />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/about" element={<About />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/students" element={<Home />} />
  
</Routes>

        </div>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
      />
    </>
  );
}

export default App;