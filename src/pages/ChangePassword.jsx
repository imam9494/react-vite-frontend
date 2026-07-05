import { useState } from "react";
import { changePassword } from "../services/userService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (form.newPassword !== form.confirmPassword) {
      alert("Konfirmasi password tidak sama");
      return;
    }

    try {
      setLoading(true);

      const res = await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      alert(res.message);

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Gagal mengganti password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <div className="container mt-4">
          <div className="card shadow">
            <div className="card-header">
              <h4>Ganti Password</h4>
            </div>

            <div className="card-body">
              <input
                className="form-control mb-3"
                type="password"
                placeholder="Password Lama"
                value={form.oldPassword}
                onChange={(e) =>
                  setForm({ ...form, oldPassword: e.target.value })
                }
              />

              <input
                className="form-control mb-3"
                type="password"
                placeholder="Password Baru"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
              />

              <input
                className="form-control mb-3"
                type="password"
                placeholder="Konfirmasi Password Baru"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />

              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Simpan Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}