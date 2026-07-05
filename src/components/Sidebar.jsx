import { Link } from "react-router-dom";

export default function Sidebar({
  collapsed,
  setCollapsed,
}) {
  return (
    <div
      style={{
        width: collapsed ? "70px" : "250px",
        minHeight: "100vh",
        background: "#212529",
        color: "white",
        padding: "15px",
      }}
    >
      <button
        className="btn btn-light mb-3"
        onClick={() => setCollapsed(!collapsed)}
      >
        ☰
      </button>

      {!collapsed && (
        <>
          <h3>Dashboard</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>

            <li className="mb-2">
              <Link to="/dashboard">
                Home
              </Link>
            </li>

            <li className="mb-2">
              <Link to="/change-password">
                Ganti Password
              </Link>
            </li>

          </ul>
          
        </>
      )}
    </div>
  );
}
