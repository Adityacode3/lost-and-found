import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllItems } from "../api";
import ItemCard from "../components/ItemCard";

export default function FoundItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async (searchVal = "") => {
    setLoading(true);
    try {
      const params = { status: "Found" };
      if (searchVal) params.search = searchVal;
      const { data } = await getAllItems(params);
      setItems(data);
    } catch (err) {
      setError("Failed to load items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchItems(val);
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="page-header-inner">
          <h1>🟢 Found Items</h1>
          <p>Browse all reported found items waiting to be claimed</p>
        </div>
      </div>

      <div className="search-bar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search found items by name..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      {error && (
        <div className="container">
          <div className="alert alert-error">{error}</div>
        </div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🟢</div>
          <h3>No found items yet</h3>
          <p>
            {search
              ? `No results for "${search}"`
              : "No found items reported yet. Found something? Report it!"}
          </p>
          <br />
          <Link to="/report-found" className="btn btn-primary">
            Report Found Item
          </Link>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
