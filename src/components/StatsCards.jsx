export default function StatsCards({
  users,
  adminCount,
  userCount,
  staffCount,
}) {
  return (
    <div className="row g-4 mb-4">

      <div className="col-12 col-sm-6 col-lg-3">
        <div
          className="card bg-primary text-white shadow border-0"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body text-center">
            <h1>👥</h1>
            <h5>Total User</h5>
            <h2 className="fw-bold">{users.length}</h2>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-lg-3">
        <div
          className="card bg-danger text-white shadow border-0"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body text-center">
            <h1>👑</h1>
            <h5>Admin</h5>
            <h2 className="fw-bold">{adminCount}</h2>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-lg-3">
        <div
          className="card bg-success text-white shadow border-0"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body text-center">
            <h1>👤</h1>
            <h5>User</h5>
            <h2 className="fw-bold">{userCount}</h2>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-lg-3">
        <div
          className="card bg-warning text-dark shadow border-0"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body text-center">
            <h1>🛠</h1>
            <h5>Staff</h5>
            <h2 className="fw-bold">{staffCount}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}