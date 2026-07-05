import { useState, useEffect } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

export default function useUsers() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function create(newUser) {
    await createUser(newUser);
    loadUsers();
  }

  async function update(id, user) {
    await updateUser(id, user);
    loadUsers();
  }

  async function remove(id) {
    await deleteUser(id);
    loadUsers();
  }

  return {
    users,
    loadUsers,
    create,
    update,
    remove,
  };
}
