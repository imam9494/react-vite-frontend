export default function EditUserModal({
  isModalOpen,
  editingUser,
  setEditingUser,
  handleUpdate,
  setIsModalOpen,
  editErrorMessage,
}) {
  if (!isModalOpen || !editingUser) return null;

  return (
    <div className="modal d-block">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>Edit User</h5>
          </div>

          <div className="modal-body">

            <input
              className="form-control mb-2"
              value={editingUser.name || ""}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  name: e.target.value,
                })
              }
            />

            <input
              className="form-control mb-2"
              value={editingUser.email || ""}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
            />
<input
  type="password"
  className="form-control mb-2"
  placeholder="Password baru (kosongkan jika tidak diubah)"
  value={editingUser.password || ""}
  onChange={(e) =>
    setEditingUser({
      ...editingUser,
      password: e.target.value,
    })
  }
/>





            <select
              className="form-select"
              value={editingUser.role || ""}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  role: e.target.value,
                })
              }
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="staff">Staff</option>
            </select>

            {editErrorMessage && (
              <div className="alert alert-danger mt-3">
                {editErrorMessage}
              </div>
            )}

          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
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
