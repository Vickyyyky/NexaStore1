import React, { useContext, useMemo, useState, useEffect } from 'react'
import './ItemDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import Product from '../Product/Product'

const ItemDisplay = ({ category }) => {
  const { item_list } = useContext(StoreContext)
  const [visibleCategories, setVisibleCategories] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')

  // Group and filter items by category
  const categorizedItems = useMemo(() => {
    const result = {}
    
    item_list.forEach(item => {
      // Filter based on selected category and search term
      const matchesCategory = category === "All" || category === item.category
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      if (matchesCategory && matchesSearch) {
        if (!result[item.category]) {
          result[item.category] = []
        }
        result[item.category].push(item)
      }
    })

    // Sort items within each category
    Object.keys(result).forEach(cat => {
      result[cat].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'name':
          default:
            return a.name.localeCompare(b.name)
        }
      })
    })

    return result
  }, [item_list, category, searchTerm, sortBy])

  // Animation for revealing categories
  useEffect(() => {
    const timer = setTimeout(() => {
      const categories = Object.keys(categorizedItems)
      categories.forEach((cat, index) => {
        setTimeout(() => {
          setVisibleCategories(prev => new Set([...prev, cat]))
        }, index * 200)
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [categorizedItems])

  const totalItems = Object.values(categorizedItems).reduce((sum, items) => sum + items.length, 0)

  return (
    <div className='item-display' id='item-display'>
      {/* Hero Section */}
      <div className="display-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Amazing
            <span className="gradient-text"> Products</span>
          </h1>
          <p className="hero-subtitle">
            Explore our carefully curated collection of premium items
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{totalItems}</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{Object.keys(categorizedItems).length}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="display-controls">
        <div className="controls-left">
          <div className="search-wrapper">
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            ⊞
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Products Display */}
      <div className="products-container">
        {Object.keys(categorizedItems).length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛍️</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        ) : (
          Object.entries(categorizedItems).map(([categoryName, items], categoryIndex) => (
            <div 
              key={categoryName} 
              className={`category-section ${visibleCategories.has(categoryName) ? 'visible' : ''}`}
              style={{ '--delay': `${categoryIndex * 0.1}s` }}
            >
              <div className="category-header">
                <div className="category-title-wrapper">
                  <h3 className="category-title">{categoryName}</h3>
                  <span className="category-count">{items.length} items</span>
                </div>
                <div className="category-line"></div>
              </div>
              
              <div className={`products-grid ${viewMode}`}>
                {items.map((item, index) => (
                  <div 
                    key={item._id} 
                    className="product-wrapper"
                    style={{ '--item-delay': `${index * 0.05}s` }}
                  >
                    <Product
                      id={item._id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Scroll to Top Button */}
      <button 
        className="scroll-top-btn"
        onClick={() => document.getElementById('item-display').scrollIntoView({ behavior: 'smooth' })}
        title="Back to Top"
      >
        ↑
      </button>
    </div>
  )
}

export default ItemDisplay