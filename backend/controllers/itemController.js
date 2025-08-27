import itemModel from "../models/itemModel.js";
import fs from "fs";

// Add item
const addItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "Image is required" });
    }

    // ✅ Build full image URL
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    const item = new itemModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price), // ensure numeric
      category: req.body.category,
      image: imageUrl, // ✅ save full URL
    });

    await item.save();
    res.json({ success: true, message: "Item Added", item });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while adding item" });
  }
};

// Get all items
const listItem = async (req, res) => {
  try {
    const items = await itemModel.find({});
    res.json({ success: true, data: items });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while fetching items" });
  }
};

// Remove item
const removeItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await itemModel.findById(itemId);

    if (!item) {
      return res.json({ success: false, message: "Item not found" });
    }

    // ✅ extract filename from URL
    const filename = item.image.split("/").pop();
    const filePath = `uploads/${filename}`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await itemModel.findByIdAndDelete(itemId);
    res.json({ success: true, message: "Item Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while removing item" });
  }
};

export { addItem, listItem, removeItem };
