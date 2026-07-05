export default function StatsCards({
  users,
  adminCount,
  userCount,
  staffCount,
}) {
  return (
    <div className="row mb-4">

      <div className="col-12 col-sm-6 col-md-3">
        <div className="card bg-primary text-white shadow">
          <div className="card-body">
            Total: {users.length}
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-3">
        <div className="card bg-danger text-white shadow">
          <div className="card-body">
            Admin: {adminCount}
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-3">
        <div className="card bg-success text-white shadow">
          <div className="card-body">
            User: {userCount}
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-3">
        <div className="card bg-warning text-white shadow">
          <div className="card-body">
            Staff: {staffCount}
          </div>
        </div>
      </div>

    </div>
  );
}
