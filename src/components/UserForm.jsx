export default function UserForm({
  newUser,
  handleInputChange,
  handleCreate,
  errorMessage,
}) {
  return (
    <div className="card mb-4 shadow">
      <div className="card-body">

        
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
        />

        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
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