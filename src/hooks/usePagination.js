import { useState } from "react";

export default function usePagination(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;

  const currentUsers = data.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    data.length / usersPerPage
  );

  function changeUsersPerPage(value) {
    setUsersPerPage(value);
    setCurrentPage(1);
  }

  return {
    currentPage,
    setCurrentPage,

    usersPerPage,
    changeUsersPerPage,

    indexOfFirst,
    currentUsers,
    totalPages,
  };
}
