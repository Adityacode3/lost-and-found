const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

// @route   POST /api/items
// @desc    Create a new item report
// @access  Private
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { itemName, description, location, contactNumber, status } = req.body;

    if (!itemName || !description || !location || !contactNumber || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const item = await Item.create({
      itemName,
      description,
      location,
      contactNumber,
      status,
      image: req.file ? req.file.filename : null,
      userId: req.user._id,
      userName: req.user.name,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/items
// @desc    Get all items (with optional search and status filter)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    if (status && (status === "Lost" || status === "Found")) {
      query.status = status;
    }

    if (search) {
      query.itemName = { $regex: search, $options: "i" };
    }

    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/items/my
// @desc    Get items of logged-in user
// @access  Private
router.get("/my", protect, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/items/:id
// @desc    Get single item by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private (owner only)
router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Only owner can update
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this item" });
    }

    const { itemName, description, location, contactNumber, status } = req.body;

    // If new image uploaded, delete old one
    if (req.file && item.image) {
      const oldImagePath = path.join(__dirname, "../uploads", item.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    item.itemName = itemName || item.itemName;
    item.description = description || item.description;
    item.location = location || item.location;
    item.contactNumber = contactNumber || item.contactNumber;
    item.status = status || item.status;
    if (req.file) item.image = req.file.filename;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private (owner only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Only owner can delete
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    // Delete image file
    if (item.image) {
      const imagePath = path.join(__dirname, "../uploads", item.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
