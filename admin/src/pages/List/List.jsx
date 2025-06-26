import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Get unique categories for filter
  const categories = ['All', ...new Set(list.map(item => item.category))];

  // Filter products based on search and category
  const filteredList = list.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/item/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      toast.error("Error fetching product list");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await axios.post(`${url}/api/item/remove`, { id: itemId });
      if (response.data.success) {
        toast.success(response.data.message || "Product removed successfully");
        fetchList();
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      toast.error("Error removing product");
      console.error(error);
    }
  };

  const startEdit = (item) => {
    setEditingItem(item._id);
    setEditForm({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description || ''
    });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditForm({ name: '', category: '', price: '', description: '' });
  };

  const updateItem = async (itemId) => {
    try {
      const response = await axios.post(`${url}/api/item/update`, {
        id: itemId,
        ...editForm
      });
      if (response.data.success) {
        toast.success("Product updated successfully");
        setEditingItem(null);
        fetchList();
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("Error updating product");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="header-content">
          <h1 className="list-title">Product Management</h1>
          <p className="list-subtitle">Manage your product inventory with ease</p>
        </div>
        <div className="list-stats">
          <div className="stat-card">
            <span className="stat-number">{list.length}</span>
            <span className="stat-label">Total Products</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{categories.length - 1}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </div>

      <div className="list-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">🔍</div>
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filteredList.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredList.map((item) => (
            <div key={item._id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={`${url}/images/${item.image}`} 
                  alt={item.name}
                  className="product-image"
                />
                <div className="product-overlay">
                  <div className="product-actions">
                    <button
                      onClick={() => startEdit(item)}
                      className="action-btn edit-btn"
                      title="Edit product"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="action-btn delete-btn"
                      title="Delete product"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>

              {editingItem === item._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="edit-input"
                    placeholder="Product name"
                  />
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className="edit-input"
                    placeholder="Category"
                  />
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="edit-input"
                    placeholder="Price"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="edit-textarea"
                    placeholder="Description"
                    rows="3"
                  />
                  <div className="edit-actions">
                    <button
                      onClick={() => updateItem(item._id)}
                      className="save-btn"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="product-info">
                  <h3 className="product-name">{item.name}</h3>
                  <span className="product-category">{item.category}</span>
                  <div className="product-price">${item.price}</div>
                  {item.description && (
                    <p className="product-description">{item.description}</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="list-footer">
        <p>Showing {filteredList.length} of {list.length} products</p>
      </div>
    </div>
  );
};

export default List;