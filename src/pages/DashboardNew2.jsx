import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

  
  export default function DashboardNew2() {
    const navigate = useNavigate();

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
  



  
 

  const usersPerPage = 10;



  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editErrorMessage, setEditErrorMessage] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });


  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/v1/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      setUsers(res.data.users);

      console.log("RES DATA =", res.data);
      console.log("USERS =", res.data.users);
      console.log("JUMLAH =", res.data.users.length);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
 


  useEffect(() => {
    fetchUsers();
  }, []);

  
  
  
  
  // OPEN EDIT
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };


    async function handleCreate() {
      try {
        await axios.post(
          "http://localhost:3000/api/v1/users",
          newUser,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        alert("User berhasil ditambahkan");

        setNewUser({
          name: "",
          email: "",
          password: "",
          role: "user",
        });

        fetchUsers();

      } catch (err) {
        alert(
          err.response?.data?.message ||
          "Gagal menambahkan user"
        );
      }
    }

 

  // UPDATE USER
  async function handleUpdate() {
    try {
      setEditErrorMessage("");

      await updateUser(editingUser.id, editingUser);

      setIsModalOpen(false);
      setEditingUser(null);

      fetchUsers();
    } catch (err) {
      setEditErrorMessage(
        err.response?.data?.message ||
        "Gagal mengupdate user"
      );
    }
 

  const handleDelete = async (id) => {
  if (!window.confirm("Yakin hapus user ini?")) {
    return;
  }
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers(); 
     
      alert("User berhasil dihapus");// refresh data
    } catch (err) {
      console.log(err);
    }
  };


  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField] || "";
    const bValue = b[sortField] || "";

    if (aValue === bValue) return 0;

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    }

    return aValue < bValue ? 1 : -1;
  });
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = sortedUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(
    sortedUsers.length / usersPerPage
  );
  

      

  const adminCount = users.filter(
    (u) => u.role === "admin"
  ).length;

  const staffCount = users.filter(
    (u) => u.role === "staff"
  ).length;

  const userCount = users.filter(
    (u) => u.role === "user"
  ).length;   
  
    
  
  return (
    <div className="d-flex">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
        {/* isi dashboard */}
      
        

      
    
        
             
        
        
        
        
        
        
              
        
        <p>
          Login sebagai:
          <strong>{currentUser?.name}</strong>
        </p>

        <div className="mb-4">
          <h1>Dashboard</h1>
          <p className="text-muted">
            Selamat datang, {currentUser?.name}
          </p>
        </div>
            

      <button onClick={handleLogout}>
        Logout
      </button>

      <button
        className="btn btn-info ms-2"
        onClick={fetchUsers}
      >
        Refresh
      </button>

     
  
        <h2 className="mb-3">Add User</h2>

        <div className="card shadow-sm mb-4">
          <div className="card-body">   
          

                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        password: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="user">User</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-success px-5"
                onClick={handleCreate}
                  >
                    ➕ Add User
                  </button>
                </div>

              </div>
            </div>

          <hr />

          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          


            <hr />
          <div className="row mb-4">

            <div className="col-md-3">
              <div className="card text-white bg-primary shadow">
                <div className="card-body">
                  <h6 className="card-title">Total User</h6>
                  <h2>{users.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-danger shadow">
                <div className="card-body">
                  <h6 className="card-title">Admin</h6>
                  <h2>
                    {users.filter((user) => user.role === "admin").length}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-dark bg-warning shadow">
                <div className="card-body">
                  <h6 className="card-title">Staff</h6>
                  <h2>
                    {users.filter((user) => user.role === "staff").length}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-white bg-success shadow">
                <div className="card-body">
                  <h6 className="card-title">User</h6>
                  <h2>
                    {users.filter((user) => user.role === "user").length}
                  </h2>
                </div>
              </div>
            </div>

          </div>


          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>


            {loading && <p>Loading...</p>}

            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle">

          <thead className="table-dark">
            <tr>
              <th onClick={() => handleSort("id")}>
                ID
              </th>





              <th onClick={() => handleSort("name")}>
                Name
              </th>

              <th onClick={() => handleSort("email")}>
                Email
              </th>

              <th onClick={() => handleSort("role")}>
                Role
              </th>
              




              <th width="180">Action</th>
            </tr>
          </thead>

          <tbody>
            
             {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    {user.role === "admin" && (
                      <span className="badge bg-danger">Admin</span>
                    )}

                    {user.role === "staff" && (
                      <span className="badge bg-warning text-dark">Staff</span>
                    )}

                    {user.role === "user" && (
                      <span className="badge bg-primary">User</span>
                    )}

                    {!user.role && (
                      <span className="badge bg-secondary">-</span>
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
</div>
        <div className="d-flex justify-content-center mt-3">

          <button
            className="btn btn-secondary me-2"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            Previous
          </button>

          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-secondary ms-2"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            Next
          </button>

        </div>




      </div>

      



      {/* MODAL EDIT */}
      {isModalOpen && editingUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "300px",
              margin: "100px auto",
            }}
          >
            <h3>Edit User</h3>

            <input
              type="text"
              value={editingUser.name || ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />

            <input
              type="email"
              value={editingUser.email || ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="New password (optional)"
              onChange={(e) =>
                setEditingUser({ ...editingUser, password: e.target.value })
              }
            />

            <select
              value={editingUser.role || ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
            >
              <option value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="staff">Staff</option>
            </select>

            <br />

            <button onClick={handleUpdate}>Save</button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingUser(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  </div >
);
}