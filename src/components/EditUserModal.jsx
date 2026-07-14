export default function EditUserModal({
  user,
  handleChange,
  handleUpdate,
  closeModal,
}) {
  if (!user) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
          </div>

          <div className="modal-body">

            <input
              type="text"
              name="name"
              className="form-control mb-2"
              value={user.name || ""}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              className="form-control mb-2"
              value={user.email || ""}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              className="form-control mb-2"
              placeholder="Kosongkan jika tidak diubah"
              value={user.password || ""}
              onChange={handleChange}
            />

            <select
              name="role"
              className="form-select"
              value={user.role || ""}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="staff">Staff</option>
            </select>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Save
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}