export default function StatsCards({
  users,
  adminCount,
  userCount,
  staffCount,
}) {
  const cards = [
    {
      title: "Total User",
      value: users.length,
      color: "primary",
      icon: "bi-people-fill",
    },
    {
      title: "Admin",
      value: adminCount,
      color: "danger",
      icon: "bi-shield-lock-fill",
    },
    {
      title: "User",
      value: userCount,
      color: "success",
      icon: "bi-person-fill",
    },
    {
      title: "Staff",
      value: staffCount,
      color: "warning",
      text: "dark",
      icon: "bi-person-workspace",
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="col-12 col-sm-6 col-xl-3"
        >
          <div
            className={`card bg-${card.color} ${
              card.text === "dark" ? "text-dark" : "text-white"
            } border-0 shadow h-100 dashboard-card`}
            style={{
              borderRadius: "18px",
            }}
          >
            <div className="card-body d-flex align-items-center justify-content-between p-4">

              <div>
                <div
                  className="fw-semibold"
                  style={{ opacity: 0.9 }}
                >
                  {card.title}
                </div>

                <h2 className="fw-bold mt-2 mb-0">
                  {card.value}
                </h2>
              </div>

              <i
                className={`bi ${card.icon}`}
                style={{
                  fontSize: "3rem",
                  opacity: 0.25,
                  transition: "0.25s",  
               }}
              ></i>

            </div>
          </div>
        </div>

      ))}
    </div>
  );
}
