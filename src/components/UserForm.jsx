export default function UserForm({
  newUser,
  setNewUser,
  handleCreate,
  errorMessage,
}) {
  return (
    <div className="card mb-4 shadow">
      <div className="card-body">

        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) =>
            setNewUser({ ...newUser, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) =>
            setNewUser({ ...newUser, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })
          }
        />

        <select
          value={newUser.role}
          onChange={(e) =>
            setNewUser({ ...newUser, role: e.target.value })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>

        {errorMessage && (
          <div className="alert alert-danger mt-2">
            {errorMessage}
          </div>
        )}

        <button onClick={handleCreate}>
          Add User
        </button>

      </div>
    </div>
  );
}