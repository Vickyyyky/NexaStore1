import React, { useState } from 'react';
import { Upload, Package, DollarSign, Tag, FileText, Sparkles, Plus, ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import './Add.css';

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Suitcases"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!image) {
      toast.error("Please upload a product image.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
     const response = await fetch(`${url}/api/item/add`, {
  method: "POST",
  body: formData,
});

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      await response.json();

      setData({
        name: "",
        description: "",
        price: "",
        category: "Suitcases"
      });
      setImage(null);
      toast.success('Product added successfully!');

    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }

    setIsSubmitting(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const categories = [
    { value: "Suitcases", icon: "🧳", className: "suitcases" },
    { value: "Men's wear", icon: "👔", className: "mens-wear" },
    { value: "Handbags", icon: "👜", className: "handbags" },
    { value: "Earings", icon: "💎", className: "earings" },
    { value: "Wallet", icon: "👛", className: "wallet" },
    { value: "Makeup", icon: "💄", className: "makeup" },
    { value: "Wrist watch", icon: "⌚", className: "watch" },
    { value: "Sneakers", icon: "👟", className: "sneakers" }
  ];

  return (
    <div className="add-container">
      <div className="add-wrapper">
        {/* Header */}
        <div className="add-header">
          <div className="add-header-icon">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="add-header-title">Add New Product</h1>
          <p className="add-header-subtitle">Create something amazing for your customers</p>
          <div className="add-header-divider"></div>
        </div>

        <form className="add-form" onSubmit={onSubmitHandler}>
          {/* Image Upload Section */}
          <div className="add-card">
            <div className="add-card-header">
              <div className="add-card-icon purple">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="add-card-title">Product Image</h3>
            </div>

            <div
              className={`add-upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="image"
                className="add-upload-input"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                required
              />
              {image ? (
                <div className="add-upload-preview">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    onClick={() => setImage(null)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="add-upload-overlay">
                    <p className="text-white font-medium">Click to change</p>
                  </div>
                </div>
              ) : (
                <div className="add-upload-placeholder">
                  <Upload />
                  <p className="add-upload-text">Drop your image here</p>
                  <p className="add-upload-subtext">or click to browse</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Details Grid */}
          <div className="add-form-grid">
            {/* Product Name */}
            <div className="add-card">
              <div className="add-card-header">
                <div className="add-card-icon blue">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h3 className="add-card-title">Product Name</h3>
              </div>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                placeholder="Enter product name..."
                className="add-input name"
                required
              />
            </div>

            {/* Product Price */}
            <div className="add-card">
              <div className="add-card-header">
                <div className="add-card-icon green">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <h3 className="add-card-title">Price</h3>
              </div>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={onChangeHandler}
                placeholder="20"
                className="add-input price"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Category Selection */}
          <div className="add-card">
            <div className="add-card-header">
              <div className="add-card-icon orange">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <h3 className="add-card-title">Category</h3>
            </div>

            <div className="add-category-grid">
              {categories.map((category, index) => (
                <div key={category.value} className="add-category-item">
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={data.category === category.value}
                    onChange={onChangeHandler}
                    className="add-category-input"
                    id={`category-${index}`}
                  />
                  <label
                    htmlFor={`category-${index}`}
                    className={`add-category-label ${category.className} ${
                      data.category === category.value ? 'active' : ''
                    }`}
                  >
                    <span className="add-category-emoji">{category.icon}</span>
                    <div className="add-category-text">{category.value}</div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="add-card">
            <div className="add-card-header">
              <div className="add-card-icon indigo">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="add-card-title">Description</h3>
            </div>
            <textarea
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              rows="6"
              placeholder="Tell customers about this product..."
              className="add-textarea"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="add-submit-container">
            <button
              type="submit"
              disabled={isSubmitting}
              className="add-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <div className="add-loading-spinner"></div>
                  Creating Product...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  Add Product
                  <Sparkles className="w-6 h-6" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
