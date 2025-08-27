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

  // Fetch products from backend
  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/item/list`);
      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setList(response.data.data);
      } else {
        setList([]);
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setList([]);
      toast.error("Error fetching product list");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Remove product
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

  // Start editing
  const startEdit = (item) => {
    setEditingItem(item._id);
    setEditForm({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description || ''
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingItem(null);
    setEditForm({ name: '', category: '', price: '', description: '' });
  };

  // Update product
  const updateItem = async (itemId) => {
    try {
      const response = await axios.post(`${url}/api/item/update`, { id: itemId, ...editForm });
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

  // Get categories for filter
  const categories = ['All', ...new Set(list.map(item => item.category))];

  // Filtered products
  const filteredList = Array.isArray(list)
    ? list.filter(item => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
      })
    : [];

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
      {/* Header */}
      <div className="list-header">
        <h1>Product Management</h1>
      </div>

      {/* Search & Filter */}
      <div className="list-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
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

      {/* Product Grid */}
      <div className="products-grid">
        {filteredList.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No products found</h3>
          </div>
        ) : (
          filteredList.map(item => (
            <div key={item._id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={`${url}/images/${item.image}`} // fixed image path
                  alt={item.name}
                  className="product-image"
                />
                <div className="product-overlay">
                  <button onClick={() => startEdit(item)} className="action-btn edit-btn">✏️</button>
                  <button onClick={() => removeItem(item._id)} className="action-btn delete-btn">🗑️</button>
                </div>
              </div>

              {editingItem === item._id ? (
                <div className="edit-form">
                  <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                  <input type="text" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} />
                  <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} />
                  <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                  <button onClick={() => updateItem(item._id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div className="product-info">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
