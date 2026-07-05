import { useEffect, useState } from "react";
import usePagination from "../hooks/usePagination";
import { logout } from "../services/api";



import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import UserForm from "../components/UserForm";
import ExportButton from "../components/ExportButton";
import UserTable from "../components/UserTable";
import EditUserModal from "../components/EditUserModal";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

export default function DashboardNew2() {
  const [users, setUsers] = useState([]);
  const [editErrorMessage, setEditErrorMessage] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const loginUser = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin = loginUser?.role === "admin";

  useEffect(() => {
    console.log("useEffect jalan");
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    loadUsers();
  }, []);
  async function handleCreateUser() {
    try {
      setErrorMessage("");

      await createUser(newUser);

      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "user",
      });

      loadUsers();

    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
        "Gagal menambahkan user"
      );
    }
  }
  async function loadUsers() {
    try {
      const data = await getUsers();

      console.log("DATA DARI API:", data);

      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }

  

  function handleEdit(user) {
    setEditingUser({
      ...user,
      password: "",
    });

    setIsModalOpen(true);
  }

  async function handleUpdate() {
    try {
      setEditErrorMessage("");

      await updateUser(editingUser.id, editingUser);

      setIsModalOpen(false);
      setEditingUser(null);

      loadUsers();

    } catch (err) {
      setEditErrorMessage(
        err.response?.data?.message ||
        "Gagal update user"
      );
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Yakin hapus user?")) return;

    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  }

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const x = a[sortField].toLowerCase();
    const y = b[sortField].toLowerCase();

    if (x < y) return sortOrder === "asc" ? -1 : 1;
    if (x > y) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

 
  

 

  const adminCount = users.filter(
    (u) => u.role === "admin"
  ).length;
const {
  currentPage,
  setCurrentPage,
  usersPerPage,
  changeUsersPerPage,
  indexOfFirst,
  currentUsers,
  totalPages,
} = usePagination(sortedUsers);
  const userCount = users.filter(
    (u) => u.role === "user"
  ).length;

  const staffCount = users.filter(
    (u) => u.role === "staff"
  ).length;

  function handleExportExcel() {
    const data = users.map((u) => ({
      Name: u.name,
      Email: u.email,
      Role: u.role,
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Users"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, "users.xlsx");
  }
  return (
    <div className="d-flex">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div className="flex-grow-1">
       
        
        <Navbar />

        <div className="container-fluid p-4">

          <StatsCards
            users={users}
            adminCount={adminCount}
            userCount={userCount}
            staffCount={staffCount}
          />

          {isAdmin && (
            <UserForm
              newUser={newUser}
              setNewUser={setNewUser}
              handleCreate={handleCreateUser}
              errorMessage={errorMessage}
            />
          )}
          <div className="d-flex justify-content-between align-items-center mb-3">

            <div className="d-flex align-items-center gap-2">
              <span>Show</span>

              <select
                className="form-select"
                style={{ width: "90px" }}
                value={usersPerPage}
                onChange={(e) =>
                  changeUsersPerPage(Number(e.target.value))
                }
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <span>entries</span>
            </div>

            <div className="d-flex align-items-center gap-3">

              <ExportButton
                handleExportExcel={handleExportExcel}
              />

             
                <label className="mb-0">Search:</label>

                <input
                  className="form-control"
                  style={{ width: "250px" }}
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

            </div>

        </div>

        <div className="table-responsive">
          <UserTable
            currentUsers={currentUsers}
            indexOfFirst={indexOfFirst}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            sortField={sortField}
            sortOrder={sortOrder}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
            isAdmin={isAdmin}
          />
        </div>
        
    

          
          <div className="d-flex justify-content-center align-items-center mt-4">
            <button
              className="btn btn-secondary me-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            <span className="mx-3">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="btn btn-secondary ms-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>

          <EditUserModal
            isModalOpen={isModalOpen}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
            handleUpdate={handleUpdate}
            setIsModalOpen={setIsModalOpen}
            editErrorMessage={editErrorMessage}
          />
        
          </div>
       </div>
    </div>
        
    );
  }  
        
 
        
        
       
