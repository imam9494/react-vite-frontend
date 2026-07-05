import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  console.log("ProtectedRoute token:", token);

  if (!token) {
    console.log("Redirect ke login");
    return <Navigate to="/" replace />;
  }

  console.log("Masuk dashboard");

  return children;
}