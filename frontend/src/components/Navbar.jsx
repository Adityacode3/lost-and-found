import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          🔍 Lost<span>&</span>Found
        </Link>

        <div className="navbar-links">
          <Link to="/lost-items" className="nav-link">Lost Items</Link>
          <Link to="/found-items" className="nav-link">Found Items</Link>
          <Link to="/my-reports" className="nav-link">My Reports</Link>
          <span className="nav-link" style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
            Hi, {user.name.split(" ")[0]}
          </span>
          <button className="nav-btn nav-btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
