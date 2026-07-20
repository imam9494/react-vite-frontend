export default function UserTable({
  
  
  
  
  users,
  currentPage,
  usersPerPage,
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
  onEdit,
  onDelete,
}) {



 
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const roleBadge = (role) => {
    switch (role) {
      case "admin":
        return (
          <span className="badge bg-danger px-3 py-2">
            👑 Admin
          </span>
        );

      case "staff":
        return (
          <span className="badge bg-warning text-dark px-3 py-2">
            👨‍💼 Staff
          </span>
        );

      default:
        return (
          <span className="badge bg-success px-3 py-2">
            👤 User
          </span>
        );
    }
  };

  console.log("USER TABLE DATA:", users);

  if (!Array.isArray(users)) {
    return (
      <div className="alert alert-danger">
        Data users bukan array
      </div>
    );
  }






  console.log(users[0]);
  console.log(typeof users[0]?.role);
  console.log(users[0]?.role);
  console.log("===== USER TABLE LOADED =====");
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-bordered align-middle text-center shadow-sm">

        <thead className="table-dark"> 
          <tr>
            <th width="70">No</th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("name")}
            >
              👤 Nama {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("email")}
            >
              ✉ Email {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>

            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("role")}
            >
              🛡 Role {sortField === "role" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>

            <th width="200">Aksi</th>
          </tr>
        </thead>

        <tbody>

          {users.length === 0 ? (

            <tr>
              <td colSpan="5">
                Tidak ada data
              </td>
            </tr>

          ) : (

            users.map((user, index) => (
              <tr key={user.id}>
                <td>{(currentPage - 1) * usersPerPage + index + 1}</td>

                <td className="fw-semibold">
                  {user.name}
                </td>

                <td className="text-primary">
                  {user.email}
                </td>
                
                <td>
                  {roleBadge(user.role)}
                </td>

               

                <td>

                  <button
                    className="btn btn-outline-warning btn-sm me-2"
                    onClick={() => onEdit(user)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDelete(user.id)}
                  >
                    🗑 Hapus
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>
    </div>
  );
}