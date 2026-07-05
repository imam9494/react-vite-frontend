export default function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }


  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm px-4"
      style={{ height: "65px" }}
    >
      <span className="navbar-brand fw-bold">
        User Management System
      </span>

      <div className="ms-auto">


<div className="ms-auto d-flex align-items-center gap-2">

  <span className="fw-semibold">
    Login sebagai: <b>{user?.name}</b> ({user?.role})


  </span>

  <button
    className="btn btn-danger"
    onClick={handleLogout}
  >
    Logout
  </button>

</div>
      </div>
    </nav>
  );
}
