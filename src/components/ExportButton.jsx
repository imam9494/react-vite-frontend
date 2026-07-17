export default function ExportButton({
    handleExportExcel,
}) {
    return (
        <button
            className="btn btn-success shadow px-4"
            onClick={handleExportExcel}
        >
            📊 Export Excel
        </button>
    );
}
