import { useNavigate } from "react-router-dom";

export default function QuickActions({
  onExport,
  onRefresh,
}) {
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4">

      <div className="card-header bg-white border-0">
        <h5 className="fw-bold mb-0">
          ⚡ Quick Action
        </h5>
      </div>

      <div className="card-body">

        <div className="row g-3">

          <div className="col-md-3">
            <button
              className="btn btn-primary w-100 py-3"
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
            >
              <i className="bi bi-person-plus-fill me-2"></i>
              Tambah User
            </button>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-success w-100 py-3"
              onClick={onExport}
            >
              <i className="bi bi-file-earmark-excel-fill me-2"></i>
              Export Excel
            </button>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-warning w-100 py-3"
              onClick={onRefresh}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Refresh
            </button>
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-dark w-100 py-3"
              onClick={() => navigate("/change-password")}
            >
              <i className="bi bi-key-fill me-2"></i>
              Password
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
