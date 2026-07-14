// DashboardNew3.jsx - PART 1

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import EditUserModal from "../components/EditUserModal";
import ExportButton from "../components/ExportButton";


export default function DashboardNew3() {

  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const toggleSidebar = () => {
  setSidebarCollapsed(!sidebarCollapsed);
};

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("id");

  const [sortOrder, setSortOrder] = useState("desc");


  const [currentPage, setCurrentPage] = useState(1);

  const [usersPerPage] = useState(10);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingUser, setEditingUser] = useState(null);



  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });



  const fetchUsers = async () => {

    try {

      setLoading(true);


      const response = await api.get("/users");


      console.log("DATA USERS :", response.data);



      if (Array.isArray(response.data)) {

        setUsers(response.data);

      }
      else if (Array.isArray(response.data.users)) {

        setUsers(response.data.users);

      }
      else {

        setUsers([]);

      }


    } catch (error) {

      console.error(
        "Gagal mengambil data user:",
        error
      );


      if (error.response?.status === 401) {

        localStorage.removeItem("token");

        navigate("/");

      }


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchUsers();

  }, []);



  const handleInputChange = (e) => {

    const {
      name,
      value
    } = e.target;


    setNewUser({

      ...newUser,

      [name]: value

    });

  };



  const handleCreate = async () => {

    try {

      await api.post(
        "/users",
        newUser
      );


      setNewUser({

        name: "",
        email: "",
        password: "",
        role: "user"

      });


      fetchUsers();


    } catch (error) {

      console.error(
        "Gagal tambah user:",
        error
      );

    }

  };
  // DashboardNew3.jsx - PART 2



  const handleUpdate = async () => {

    try {

      await api.put(
        `/users/${editingUser.id}`,
        editingUser
      );


      setIsModalOpen(false);

      setEditingUser(null);


      fetchUsers();


    } catch (error) {

      console.error(
        "Gagal update user:",
        error
      );

    }

  };




  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus?")) return;

    await api.delete(`/users/${id}`);
    fetchUsers();
  };


   





  const openEdit = (user) => {


    setEditingUser({

      ...user

    });


    setIsModalOpen(true);

 const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingUser({
      ...editingUser,
      [name]: value,
    });
  };


  const handleSort = (field) => {


    if (sortField === field) {


      setSortOrder(

        sortOrder === "asc"
          ? "desc"
          : "asc"

      );


    }
    else {


      setSortField(field);

      setSortOrder("asc");


    }


  };






  const filteredUsers = users.filter((user) => {


    const keyword = search.toLowerCase();



    return (

      user.name
        ?.toLowerCase()
        .includes(keyword)

      ||

      user.email
        ?.toLowerCase()
        .includes(keyword)

      ||

      user.role
        ?.toLowerCase()
        .includes(keyword)


    );


  });








  const sortedUsers = [

    ...filteredUsers

  ].sort((a, b) => {


    let first = a[sortField];

    let second = b[sortField];



    if (

      typeof first === "string"

    ) {


      first = first.toLowerCase();

      second = second.toLowerCase();


    }



    if (first < second) {

      return sortOrder === "asc"
        ? -1
        : 1;

    }


    if (first > second) {

      return sortOrder === "asc"
        ? 1
        : -1;

    }


    return 0;


  });






  const totalPages = Math.ceil(

    sortedUsers.length /

    usersPerPage

  );





  const indexLast =

    currentPage *

    usersPerPage;





  const indexFirst =

    indexLast -

    usersPerPage;





  const currentUsers =

    sortedUsers.slice(

      indexFirst,

      indexLast

    );





  const nextPage = () => {


    if (currentPage < totalPages) {

      setCurrentPage(

        currentPage + 1

      );

    }


  };





  const prevPage = () => {


    if (currentPage > 1) {

      setCurrentPage(

        currentPage - 1

      );

    }


  };
  // DashboardNew3.jsx - PART 3



  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh"
      }}
    >








      <Sidebar





        collapsed={sidebarCollapsed}

        setCollapsed={setSidebarCollapsed}

      />




      <div

        style={{

          flex: 1,

          background: "#f4f6f9"

        }}

      >

        

        <Navbar
          toggleSidebar={toggleSidebar}
        />
         <button
          onClick={toggleSidebar}
        >
          ☰
        </button>




        <div className="container-fluid p-4">



          <h2 className="mb-4">

            Dashboard Users </h2>
            <StatsCards
              users={users}
              adminCount={users.filter((u) => u.role === "admin").length}
              userCount={users.filter((u) => u.role === "user").length}
              staffCount={users.filter((u) => u.role === "staff").length}
            />

            <div className="card p-3 mb-4">
              <div className="d-flex justify-content-between">

                <input
                  type="text"
                  className="form-control"
                  style={{ width: "300px" }}
                  placeholder="Search user..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                <ExportButton users={sortedUsers} />
              </div>
            </div>

            
          
          <div

            className="card p-3 mb-4"

          >


            <div

              className="d-flex justify-content-between"

            >



              <input

                type="text"

                className="form-control"

                style={{

                  width: "300px"

                }}

                placeholder="Search user..."

                value={search}

                onChange={(e) => {

                  setSearch(e.target.value);

                  setCurrentPage(1);

                }}

              />





              <ExportButton

                users={sortedUsers}

              />


            </div>



          </div>









          <UserForm


            newUser={newUser}


            handleInputChange={

              handleInputChange
            }


            handleCreate={

              handleCreate

            }


          />


          





          <UserTable
            users={currentUsers}
            sortField={sortField}
            sortOrder={sortOrder}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />








          <div

            className="d-flex justify-content-between align-items-center mt-3"

          >


            <button

              className="btn btn-secondary"

              onClick={prevPage}

              disabled={currentPage === 1}

            >

              Prev

            </button>





            <span>

              Page {currentPage} / {totalPages || 1}

            </span>





            <button

              className="btn btn-secondary"

              onClick={nextPage}

              disabled={

                currentPage === totalPages

                ||

                totalPages === 0

              }

            >

              Next

            </button>



          </div>









        </div>





      </div>









      {
        isModalOpen && editingUser && (



          <EditUserModal


            user={editingUser}


            handleChange={handleEditChange}


            handleUpdate={handleUpdate}


            closeModal={() => {


              setIsModalOpen(false);


              setEditingUser(null);


            }}


          />



        )

      }





    </div>

  );


}
}
