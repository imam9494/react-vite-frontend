export default function ExportButton({
  handleExportExcel,
}) {
  return (
    <button
      className="btn btn-success"
      onClick={handleExportExcel}
    >
      📊 Export Excel
    </button>
  );
}
