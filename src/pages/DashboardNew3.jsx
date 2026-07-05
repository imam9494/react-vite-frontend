import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
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

export default function DashboardNew2() {

  return (
    <div>
      <h1>DashboardNew2</h1>
    </div>
  );




  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreateUser() {
    await createUser(newUser);

    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "user",
    });

    loadUsers();
  }

  function handleEdit(user) {
    setEditingUser(user);
    setIsModalOpen(true);
  }

  async function handleUpdate() {
    await updateUser(editingUser.id, editingUser);

    setIsModalOpen(false);
    setEditingUser(null);

    loadUsers();
  }

  async function handleDelete(id) {
    if (!window.confirm("Hapus user?")) return;

    await deleteUser(id);

    loadUsers();
  }

  const filteredUsers = users.filter((u) => {
    const keyword = search.toLowerCase();

    return (
      u.name.toLowerCase().includes(keyword) ||
      u.email.toLowerCase().includes(keyword) ||
      u.role.toLowerCase().includes(keyword)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField]
        .toString()
        .localeCompare(b[sortField].toString());
    }

    return b[sortField]
      .toString()
      .localeCompare(a[sortField].toString());
  });

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;

  const currentUsers = sortedUsers.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    sortedUsers.length / usersPerPage
  );

  const adminCount = users.filter(
    (u) => u.role === "admin"
  ).length;

  const userCount = users.filter(
    (u) => u.role === "user"
  ).length;

  const staffCount = users.filter(
    (u) => u.role === "staff"
  ).length;

  function handleExportExcel() {
    alert("Export Excel sementara");
  }
