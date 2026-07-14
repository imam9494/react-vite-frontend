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

  return (
    <table className="table table-bordered table-hover table-striped text-center">
      <thead className="table-dark">
        <tr>
          <th>No</th>

          <th
            style={{ cursor: "pointer" }}
            onClick={() => handleSort("name")}
          >
            Name{" "}
            {sortField === "name" &&
              (sortOrder === "asc" ? "▲" : "▼")}
          </th>

          <th
            style={{ cursor: "pointer" }}
            onClick={() => handleSort("email")}
          >
            Email{" "}
            {sortField === "email" &&
              (sortOrder === "asc" ? "▲" : "▼")}
          </th>

          <th
            style={{ cursor: "pointer" }}
            onClick={() => handleSort("role")}
          >
            Role{" "}
            {sortField === "role" &&
              (sortOrder === "asc" ? "▲" : "▼")}
          </th>

          <th width="170">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="5">Tidak ada data</td>
          </tr>
        ) : (
          users.map((user, index) => (
            <tr key={user.id}>
              <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(user.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}