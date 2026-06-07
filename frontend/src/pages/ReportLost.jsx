import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../api";

export default function ReportLost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    location: "",
    contactNumber: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { itemName, description, location, contactNumber } = form;
    if (!itemName || !description || !location || !contactNumber) {
      return setError("Please fill in all required fields.");
    }

    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("contactNumber", contactNumber);
    formData.append("status", "Lost");
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      await createItem(formData);
      setSuccess("Lost item reported successfully!");
      setTimeout(() => navigate("/lost-items"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="page-header-inner">
          <h1>🔴 Report Lost Item</h1>
          <p>Fill in the details below to report a lost item</p>
        </div>
      </div>

      <div className="report-page">
        <div className="report-form-card">
          <h2>🔴 Lost Item Details</h2>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Item Name *</label>
              <input
                type="text"
                name="itemName"
                placeholder="e.g. Blue Backpack, iPhone 13"
                value={form.itemName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                placeholder="Describe the item in detail (color, brand, distinguishing features...)"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Place Lost *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Central Park, New York"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Contact Number *</label>
              <input
                type="tel"
                name="contactNumber"
                placeholder="e.g. +91 98765 43210"
                value={form.contactNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Item Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{ marginTop: 10, borderRadius: 8, maxHeight: 180, objectFit: "cover" }}
                />
              )}
            </div>

            <button
              type="submit"
              className="btn btn-danger btn-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Lost Report"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
