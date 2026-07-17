import { useEffect, useState } from "react";

import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import ExportButton from "../components/ExportButton";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import EditUserModal from "../components/EditUserModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function DashboardFinal() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };


    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const fetchUsers = async () => {
        try {
            const res = await api.get("/users");

            if (Array.isArray(res.data)) {
                setUsers(res.data);
            } else {
                setUsers(res.data.users || []);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleEdit = (user) => {
        setEditingUser({ ...user });
        setIsModalOpen(true);
    };
    const handleEditChange = (e) => {
        const { name, value } = e.target;

        setEditingUser({
            ...editingUser,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/users/${editingUser.id}`, editingUser);

            setIsModalOpen(false);
            setEditingUser(null);

            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Yakin hapus user?")) return;

        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };



            
        
    

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setNewUser({
            ...newUser,
            [name]: value,
        });
    };
    
    const handleCreate = async () => {
        try {
            await api.post("/users", newUser);

            setNewUser({
                name: "",
                email: "",
                password: "",
                role: "user",
            });

            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };


    const handleExportExcel = () => {
        const data = sortedUsers.map((user, index) => ({
            No: index + 1,
            Nama: user.name,
            Email: user.email,
            Role: user.role,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

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

        const file = new Blob(
            [excelBuffer],
            {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            }
        );

        saveAs(
            file,
            `users_${new Date().toISOString().slice(0, 10)}.xlsx`
        );
    };

    const filteredUsers = users.filter((user) => {
        const keyword = search.toLowerCase();

        return (
            user.name?.toLowerCase().includes(keyword) ||
            user.email?.toLowerCase().includes(keyword) ||
            user.role?.toLowerCase().includes(keyword)
        );
    });



    const sortedUsers = [...filteredUsers].sort((a, b) => {
        let first = a[sortField];
        let second = b[sortField];

        if (typeof first === "string") {
            first = first.toLowerCase();
            second = second.toLowerCase();
        }

        if (first < second) return sortOrder === "asc" ? -1 : 1;
        if (first > second) return sortOrder === "asc" ? 1 : -1;

        return 0;
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
   

    
    console.log("users =", users);
    console.table(currentUsers);



    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
            }}
        >
            <Sidebar
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />

            <div
                style={{
                    flex: 1,
                    background: "#f4f6f9",
                }}
            >
                <Navbar toggleSidebar={toggleSidebar} />

                <div className="container-fluid p-4">

                    <div className="mb-4">
                        <h2 className="fw-bold text-dark">
                            📊 Dashboard
                        </h2>

                        <p className="text-muted mb-0">
                            User Management System
                        </p>
                    </div>



                    
                    <StatsCards
                        users={users}
                        adminCount={
                            users.filter((u) => u.role === "admin").length
                        }
                        userCount={
                            users.filter((u) => u.role === "user").length
                        }
                        staffCount={
                            users.filter((u) => u.role === "staff").length
                        }
                    />
                    <div className="card p-3 mb-4">
                        <div className="d-flex justify-content-between align-items-center">

                            <input
    type="text"
    className="form-control shadow-sm"
    style={{
        width: "350px",
        borderRadius: "10px",
    }}
    placeholder="🔍 Cari nama, email, atau role..."
    value={search}
    onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }}
/>


                            
                            <ExportButton
                                handleExportExcel={handleExportExcel}
                            /> 




                        </div>
                    </div>
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">➕ Tambah User</h5>
                        </div>

                        <div className="card-body">
                            <UserForm
                                newUser={newUser}
                                handleInputChange={handleInputChange}
                                handleCreate={handleCreate}
                            />
                        </div>
                    </div>
                   
                   <div className="card border-0 shadow-sm">
    <div className="card-header bg-dark text-white">
        <h5 className="mb-0">📋 Daftar User</h5>
    </div>

    <div className="card-body">

        <UserTable
            users={currentUsers}
            currentPage={currentPage}
            usersPerPage={usersPerPage}
            sortField={sortField}
            sortOrder={sortOrder}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />

    </div>
</div>
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">

                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage((p) => p - 1)}
                                    >
                                        Previous
                                    </button>
                                </li>

                                {[...Array(totalPages)].map((_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage((p) => p + 1)}
                                    >
                                        Next
                                    </button>
                                </li>

                            </ul>
                        </nav>
                    </div>


                </div>
            </div>



            
            {isModalOpen && editingUser && (
                <EditUserModal
                    user={editingUser}
                    handleChange={handleEditChange}
                    handleUpdate={handleUpdate}
                    closeModal={() => {
                        setIsModalOpen(false);
                        setEditingUser(null);
                    }}
                />
            )}


        </div>
    );
}