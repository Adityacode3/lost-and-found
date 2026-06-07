import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllItems } from "../api";

export default function Home() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ lost: 0, found: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          getAllItems({ status: "Lost" }),
          getAllItems({ status: "Found" }),
        ]);
        setCounts({ lost: lostRes.data.length, found: foundRes.data.length });
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  const actions = [
    {
      to: "/report-lost",
      icon: "🔴",
      title: "Report Lost Item",
      desc: "Lost something? Let the community help",
      className: "action-card report-lost",
    },
    {
      to: "/report-found",
      icon: "🟢",
      title: "Report Found Item",
      desc: "Found something? Help reunite it",
      className: "action-card report-found",
    },
    {
      to: "/lost-items",
      icon: "🔍",
      title: "Browse Lost Items",
      desc: "See what people are looking for",
      className: "action-card",
    },
    {
      to: "/found-items",
      icon: "📦",
      title: "Browse Found Items",
      desc: "See items waiting to be claimed",
      className: "action-card",
    },
    {
      to: "/my-reports",
      icon: "📋",
      title: "My Reports",
      desc: "Manage your posted reports",
      className: "action-card",
    },
  ];

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="home-hero">
        <h1>Hello, {user?.name?.split(" ")[0]} 👋</h1>
        <p>Help your community reconnect lost items with their owners.</p>

        <div className="stats-row">
          <div className="stat-card lost">
            <div className="stat-num">{loading ? "—" : counts.lost}</div>
            <div className="stat-label">Lost Items Reported</div>
          </div>
          <div className="stat-card found">
            <div className="stat-num">{loading ? "—" : counts.found}</div>
            <div className="stat-label">Found Items Reported</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="actions-section">
        <div className="actions-grid">
          {actions.map((action) => (
            <Link to={action.to} key={action.to} className={action.className}>
              <div className="action-icon">{action.icon}</div>
              <h3>{action.title}</h3>
              <p>{action.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
