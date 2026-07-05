export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="d-flex align-items-center gap-2">
      <label className="mb-0">Search:</label>

      <input
        className="form-control"
        style={{ width: "250px" }}
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
