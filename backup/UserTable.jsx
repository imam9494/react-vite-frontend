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
        return <span className="badge bg-danger">Admin</span>;
      case "staff":
        return <span className="badge bg-warning text-dark">Staff</span>;
      default:
        return <span className="badge bg-success">User</span>;
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle text-center">

        <thead
          style={{
            background: "#0d6efd",
            color: "white",
          }}
        >
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

                <td style={{ color: "red", fontWeight: "bold" }}>
                  {String(user.name)}
                </td>

                <td style={{ color: "blue", fontWeight: "bold" }}>
                  {String(user.email)}
                </td>

                <td>
                  {String(user.role)}
                </td>
              

                <td>
                  {roleBadge(user.role)}
                </td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(user)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
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