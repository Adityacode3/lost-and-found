const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ItemCard({ item }) {
  const dateStr = new Date(item.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="item-card">
      {item.image ? (
        <img
          src={`${API_URL}/uploads/${item.image}`}
          alt={item.itemName}
          className="item-card-img"
        />
      ) : (
        <div className="item-card-img-placeholder">
          {item.status === "Lost" ? "🔴" : "🟢"}
        </div>
      )}

      <div className="item-card-body">
        <span className={`item-badge ${item.status === "Lost" ? "badge-lost" : "badge-found"}`}>
          {item.status}
        </span>
        <h3>{item.itemName}</h3>
        <p className="item-card-desc">{item.description}</p>

        <div className="item-card-meta">
          <div className="meta-row">
            <span>📍</span>
            <span>{item.location}</span>
          </div>
          <div className="meta-row">
            <span>📞</span>
            <span>{item.contactNumber}</span>
          </div>
          <div className="meta-row">
            <span>👤</span>
            <span>{item.userName}</span>
          </div>
          <div className="meta-row">
            <span>📅</span>
            <span>{dateStr}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
