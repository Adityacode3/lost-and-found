import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyItems, updateItem, deleteItem } from "../api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyReports() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchMyItems = async () => {
    try {
      const { data } = await getMyItems();
      setItems(data);
    } catch (err) {
      setError("Failed to load your reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  // Open edit modal
  const openEdit = (item) => {
    setEditItem(item);
    setEditForm({
      itemName: item.itemName,
      description: item.description,
      location: item.location,
      contactNumber: item.contactNumber,
      status: item.status,
    });
    setEditImage(null);
    setEditError("");
  };

  const handleEditChange = (e) =>
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");

    if (!editForm.itemName || !editForm.description || !editForm.location || !editForm.contactNumber) {
      return setEditError("All fields are required.");
    }

    const formData = new FormData();
    Object.entries(editForm).forEach(([k, v]) => formData.append(k, v));
    if (editImage) formData.append("image", editImage);

    setEditLoading(true);
    try {
      await updateItem(editItem._id, formData);
      setEditItem(null);
      fetchMyItems();
    } catch (err) {
      setEditError(err.response?.data?.message || "Update failed.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setDeleteConfirm(null);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="page-header-inner">
          <h1>📋 My Reports</h1>
          <p>Manage the items you have reported</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 0 }}>
        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading your reports...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No reports yet</h3>
            <p>You haven&apos;t reported any lost or found items.</p>
            <br />
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/report-lost" className="btn btn-danger">Report Lost Item</Link>
              <Link to="/report-found" className="btn btn-primary">Report Found Item</Link>
            </div>
          </div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="my-reports-item">
              {item.image ? (
                <img
                  src={`${API_URL}/uploads/${item.image}`}
                  alt={item.itemName}
                  className="my-reports-img"
                />
              ) : (
                <div className="my-reports-img-placeholder">
                  {item.status === "Lost" ? "🔴" : "🟢"}
                </div>
              )}

              <div className="my-reports-body">
                <div className="my-reports-info">
                  <span
                    className={`item-badge ${item.status === "Lost" ? "badge-lost" : "badge-found"}`}
                  >
                    {item.status}
                  </span>
                  <h3>{item.itemName}</h3>
                  <p>{item.description.slice(0, 80)}{item.description.length > 80 ? "..." : ""}</p>
                  <div className="meta-row" style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    <span>📍</span><span>{item.location}</span>
                    <span style={{ marginLeft: 12 }}>📅</span>
                    <span>{new Date(item.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                </div>

                <div className="my-reports-actions">
                  <button className="btn btn-outline" onClick={() => openEdit(item)}>
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setDeleteConfirm(item._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="modal-overlay" onClick={() => setEditItem(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>✏️ Edit Report</h2>

            {editError && <div className="alert alert-error">{editError}</div>}

            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={editForm.itemName}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={editForm.contactNumber}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={editForm.status} onChange={handleEditChange}>
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>

              <div className="form-group">
                <label>Replace Image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditItem(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={editLoading}
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-card" style={{ maxWidth: 380 }} onClick={(e) => e.stopPropagation()}>
            <h2>🗑️ Delete Report</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
              Are you sure you want to delete this report? This action cannot be undone.
            </p>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
