import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAddTodo, categories }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo({
        title: title.trim(),
        description: description.trim(),
        category: newCategory || category,
        priority,
        dueDate,
      });
      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('medium');
      setDueDate('');
      setNewCategory('');
      setShowAdvanced(false);
    }
  };

  return (
    <div className="todo-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            id="title"
            type="text"
            placeholder="What do you need to do?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
          <span className="char-count">{title.length}/100</span>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Add more details (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows="3"
          />
          <span className="char-count">{description.length}/500</span>
        </div>

        {/* Priority */}
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <div className="priority-buttons">
            {['low', 'medium', 'high'].map((p) => (
              <button
                key={p}
                type="button"
                className={`priority-btn ${priority === p ? 'active' : ''} ${p}`}
                onClick={() => setPriority(p)}
                title={`Set priority to ${p}`}
              >
                {p === 'low' && '🟢'}
                {p === 'medium' && '🟡'}
                {p === 'high' && '🔴'}
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Advanced */}
        <button
          type="button"
          className="toggle-advanced"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? '▼ Hide Options' : '▶ More Options'}
        </button>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="advanced-options">
            {/* Due Date */}
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <div className="category-input">
                {categories.length > 1 && (
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setNewCategory('');
                    }}
                  >
                    <option value="">Select existing...</option>
                    {categories
                      .filter((c) => c !== 'all')
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                )}
                <input
                  type="text"
                  placeholder="Or create new category"
                  value={newCategory}
                  onChange={(e) => {
                    setNewCategory(e.target.value);
                    setCategory('');
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          ➕ Add Task
        </button>
      </form>
    </div>
  );
}

export default TodoForm;