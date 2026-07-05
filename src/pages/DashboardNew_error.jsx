import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";
import UserForm from "../components/UserForm";
import ExportButton from "../components/ExportButton";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";
import EditUserModal from "../components/EditUserModal";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";




  // ================= STATE =================

  // ================= STATE =================
  export default function DashboardNew() {
    const [users, setUsers] = useState([]);

    const handleExportExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(users);

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Users"
      );

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const fileData = new Blob(
        [excelBuffer],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        }
      );

      saveAs(fileData, "users.xlsx");
    };

    const handleEdit = (user) => {
      setEditingUser(user);
      setIsModalOpen(true);
    };

    
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);


    const handleUpdate = async () => {
      try {
        await updateUser(editingUser.id, {
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
        });

        setIsModalOpen(false);
        setEditingUser(null);

        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    };


    



    const [newUser, setNewUser] = useState({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const handleDelete = async (id) => {
      if (!window.confirm("Hapus user ini?")) return;

      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    };




    

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gagal fetch users:", err);
        setUsers([]);
      }
    };

    

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    

    
    
    const handleCreateUser = async () => {
      try {
        console.log("👉 BUTTON KEPENCET");

        const res = await createUser(newUser);
        console.log("👉 RESPONSE:", res.data);

        // 🔥 RESET FORM
        setNewUser({
          name: "",
          email: "",
          password: "",
          role: "user",
        });

        // 🔥 PAKSA REFRESH DATA
        await fetchUsers();

      } catch (err) {
        console.log("❌ ERROR:", err);
      }
    };
    

    
    
    

    
    useEffect(() => {
      fetchUsers();
    }, []);

    

  // ================= STATS =================

  
  // ================= SEARCH =================
  

    const filteredUsers = (users || []).filter((u) =>
      `${u.name} ${u.email} ${u.role}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // ================= SORT =================
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aVal = a[sortField] ?? "";
    const bVal = b[sortField] ?? "";

    if (aVal === bVal) return 0;

    return sortOrder === "asc"
      ? aVal > bVal ? 1 : -1
      : aVal < bVal ? 1 : -1;
  });

  // ================= PAGINATION =================
    const usersPerPage = 10;

    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;

    const currentUsers = sortedUsers.slice(
      indexOfFirst,
      indexOfLast
    );

    const totalPages = Math.ceil(
      sortedUsers.length / usersPerPage
    );

    const adminCount = users.filter((u) => u.role === "admin").length;
    const userCount = users.filter((u) => u.role === "user").length;
    const staffCount = users.filter((u) => u.role === "staff").length;
  //  const [isModalOpen, setIsModalOpen] = useState(false);
   

    // const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // ================= RENDER =================
    return (
      <div className="d-flex">

        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <div
          
          className="flex-grow-1 "
                 <div className="flex-grow-1"> 
          <Navbar />

          <div className="p-4">

            <StatsCards
              users={users}
              adminCount={adminCount}
              userCount={userCount}
              staffCount={staffCount}
            />

            <UserForm
              newUser={newUser}
              setNewUser={setNewUser}
              handleCreate={handleCreateUser}
            />

            <ExportButton handleExportExcel={handleExportExcel} />

            <SearchBar
              search={search}
              setSearch={setSearch}
            />

            <UserTable
              currentUsers={currentUsers}
              indexOfFirst={indexOfFirst}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              sortField={sortField}
              sortOrder={sortOrder}
              setSortField={setSortField}
              setSortOrder={setSortOrder}
            />

            {/* Pagination */}

            <EditUserModal
              isModalOpen={isModalOpen}
              editingUser={editingUser}
              setEditingUser={setEditingUser}
              handleUpdate={handleUpdate}
              setIsModalOpen={setIsModalOpen}
            />

          </div>
        </div>
       
          <h1>Dashboard</h1>

          </div>
      
    );
  }