import React from 'react';
import './FilterBar.css';

function FilterBar({
  filter,
  setFilter,
  category,
  setCategory,
  search,
  setSearch,
  sortBy,
  setSortBy,
  categories,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Filter:</label>
        <div className="filter-buttons">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' && '📋 All'}
              {f === 'active' && '🔄 Active'}
              {f === 'completed' && '✓ Done'}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Sort:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="date">📅 Date Added</option>
          <option value="priority">🎯 Priority</option>
          <option value="dueDate">⏰ Due Date</option>
        </select>
      </div>

      {categories.length > 1 && (
        <div className="filter-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            {categories
              .filter((c) => c !== 'all')
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
      )}

      <div className="filter-group search">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        {search && (
          <button
            className="clear-search"
            onClick={() => setSearch('')}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;